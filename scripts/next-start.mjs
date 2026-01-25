import { spawn } from "node:child_process"

function getArg(name, fallback) {
  // Take the last occurrence so `npm run start -- --port 3001` overrides defaults.
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

const childArgs = ["start", "-H", host, "-p", port]

const child = spawn(nextBin, childArgs, {
  stdio: "inherit",
  env: process.env,
})

child.on("exit", (code, signal) => {
  process.exit(code ?? 1)
})

