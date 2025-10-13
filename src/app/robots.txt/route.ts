import { type NextRequest, NextResponse } from 'next/server'

export async function GET(_request: NextRequest) {
  // Check if this is a production deployment
  const isProduction =
    process.env.NODE_ENV === 'production' &&
    (process.env.VERCEL_URL?.includes('jacksimpson.dev') ||
      process.env.NEXT_PUBLIC_VERCEL_ENV === 'production')

  const robotsTxt = isProduction
    ? `User-agent: *
Allow: /

Sitemap: https://jacksimpson.dev/sitemap.xml`
    : `User-agent: *
Disallow: /`

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  })
}
