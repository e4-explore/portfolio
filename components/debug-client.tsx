"use client"

import * as React from "react"

// Optional client-side debug ingest.
// If not set, this component is a complete no-op.
const ENDPOINT = process.env.NEXT_PUBLIC_DEBUG_INGEST_URL

function safePost(payload: Record<string, unknown>) {
  if (!ENDPOINT) return
  fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      sessionId: "debug-session",
      runId: "verify",
      hypothesisId: "E",
      timestamp: Date.now(),
      ...payload,
    }),
  }).catch(() => {})
}

export function DebugClient() {
  React.useEffect(() => {
    safePost({
      location: "components/debug-client.tsx:29",
      message: "client mounted",
      data: {
        href: window.location.href,
        userAgent: navigator.userAgent,
      },
    })

    const onError = (event: ErrorEvent) => {
      safePost({
        location: "components/debug-client.tsx:41",
        message: "window error",
        data: {
          message: event.message,
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
        },
      })
    }

    const onRejection = (event: PromiseRejectionEvent) => {
      safePost({
        location: "components/debug-client.tsx:56",
        message: "unhandledrejection",
        data: {
          reason:
            typeof event.reason === "string"
              ? event.reason
              : event.reason?.message || String(event.reason),
        },
      })
    }

    window.addEventListener("error", onError)
    window.addEventListener("unhandledrejection", onRejection)
    return () => {
      window.removeEventListener("error", onError)
      window.removeEventListener("unhandledrejection", onRejection)
    }
  }, [])

  return null
}

