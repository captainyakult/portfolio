import { type NextRequest, NextResponse } from 'next/server'

export async function GET(_request: NextRequest) {
  // Check if this is a production deployment
  const isProduction =
    process.env.NODE_ENV === 'production' &&
    (process.env.VERCEL_URL?.includes('jacksimpson.dev') ||
      process.env.NEXT_PUBLIC_VERCEL_ENV === 'production')

  // Only generate sitemap for production
  if (!isProduction) {
    return new NextResponse('Sitemap not available for preview deployments', {
      status: 200,
      headers: {
        'Content-Type': 'text/plain',
      },
    })
  }

  const baseUrl = 'https://jacksimpson.dev'

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/projects</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/experiments</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/about</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
</urlset>`

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
