'use client'

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en" className="h-full bg-neutral-950 text-base antialiased">
      <body className="flex min-h-full flex-col items-center justify-center">
        <div className="flex max-w-xl flex-col items-center text-center px-6">
          <p className="font-sans text-4xl font-semibold text-neutral-100 sm:text-5xl">
            500
          </p>
          <h1 className="mt-4 font-sans text-2xl font-semibold text-neutral-100">
            Something went wrong
          </h1>
          <p className="mt-2 text-sm text-neutral-500">
            A critical error occurred. Please try again.
          </p>
          <button
            onClick={reset}
            className="mt-4 text-sm font-semibold text-neutral-100 transition hover:text-neutral-400"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}
