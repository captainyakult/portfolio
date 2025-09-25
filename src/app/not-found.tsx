import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-6">
        <div className="text-6xl mb-6">🌌</div>
        <h1 className="text-4xl font-bold mb-4 gradient-text">404</h1>
        <h2 className="text-2xl font-semibold mb-4 text-text">Page Not Found</h2>
        <p className="text-text-secondary mb-8">
          The page you're looking for seems to have drifted into another dimension.
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:scale-105 transition-transform duration-300 inline-block"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}