import { spawn } from "node:child_process"
import net from "node:net"
import fs from "node:fs/promises"

function getArg(name, fallback) {
  // Take the last occurrence so `npm run dev -- --port 3001` overrides defaults.
  for (let i = process.argv.length - 1; i >= 0; i--) {
    if (process.argv[i] !== name) continue
    const value = process.argv[i + 1]
    return value ?? fallback
  }
  return fallback
}

const host = getArg("--host", process.env.NEXT_HOST || process.env.HOST || "127.0.0.1")
const port = getArg("--port", process.env.PORT || "3000")

const nextBin =
  process.platform === "win32" ? "node_modules/.bin/next.cmd" : "node_modules/.bin/next"

async function canListen({ host, port }) {
  return await new Promise((resolve) => {
    const server = net.createServer()
    const onError = () => {
      try {
        server.close()
      } catch {}
      resolve(false)
    }
    server.once("error", onError)
    server.listen({ host, port }, () => {
      server.close(() => resolve(true))
    })
  })
}

async function pickPort({ host, preferredPort, maxTries = 25 }) {
  const base = Number.parseInt(String(preferredPort), 10)
  if (!Number.isFinite(base)) return String(preferredPort)
  for (let i = 0; i <= maxTries; i++) {
    const candidate = base + i
    // eslint-disable-next-line no-await-in-loop
    if (await canListen({ host, port: candidate })) return String(candidate)
  }
  return String(preferredPort)
}

const resolvedPort = await pickPort({ host, preferredPort: port })

// Best-effort cleanup for stale Next dev locks.
// (If another `next dev` is actively running, Next will still fail fast.)
try {
  const lockPath = ".next/dev/lock"
  const stat = await fs.stat(lockPath)
  const ageMs = Date.now() - stat.mtimeMs
  if (ageMs > 2 * 60 * 1000) {
    await fs.unlink(lockPath)
  }
} catch {
  // ignore
}

const childArgs = ["dev", "-H", host, "-p", resolvedPort]

const child = spawn(nextBin, childArgs, {
  stdio: ["inherit", "pipe", "pipe"],
  env: {
    ...process.env,
    // Avoid EMFILE ("too many open files") watcher errors by using polling.
    // (You can override via env if you want native watching.)
    WATCHPACK_POLLING: process.env.WATCHPACK_POLLING ?? "1000",
  },
})

let sawLocalLine = false
let sawReadyLine = false

child.stdout.on("data", (buf) => {
  const text = buf.toString("utf8")
  process.stdout.write(text)
  if (!sawLocalLine && text.includes("Local:")) sawLocalLine = true
  if (!sawReadyLine && text.includes("Ready")) sawReadyLine = true
})

child.stderr.on("data", (buf) => {
  const text = buf.toString("utf8")
  process.stderr.write(text)
})

child.on("exit", (code, signal) => {
  process.exit(code ?? 1)
})

