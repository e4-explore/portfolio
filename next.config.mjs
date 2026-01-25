import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function normalizeWebpackIgnored(ignored) {
  const out = []

  const add = (value) => {
    if (value == null) return
    if (typeof value === "string") {
      const trimmed = value.trim()
      if (trimmed) out.push(trimmed)
      return
    }
    // Webpack accepts RegExp as well.
    if (value instanceof RegExp) {
      out.push(value)
    }
  }

  if (Array.isArray(ignored)) {
    for (const v of ignored) add(v)
  } else {
    add(ignored)
  }

  return out
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    // Prevent Next from "walking up" to unrelated lockfiles outside this repo.
    root: __dirname,
  },
  webpack: (config, { dev }) => {
    if (dev) {
      // Next 16+ may freeze parts of the webpack config; avoid mutating nested objects.
      const currentWatchOptions = config.watchOptions ?? {}

      // If a user/system sets this to "" (empty string), webpack rejects the schema.
      // Normalize to non-empty strings (and RegExp) only.
      const mergedIgnored = normalizeWebpackIgnored(currentWatchOptions.ignored)

      // Avoid EMFILE ("too many open files") watcher errors on macOS by using polling.
      // This is dev-only and trades some CPU for stability.
      config.watchOptions = {
        ...currentWatchOptions,
        ...(mergedIgnored.length ? { ignored: mergedIgnored } : {}),
        poll: currentWatchOptions.poll ?? 1000,
        aggregateTimeout: currentWatchOptions.aggregateTimeout ?? 300,
      }
    }

    return config
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig