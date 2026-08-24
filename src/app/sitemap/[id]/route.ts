import { getSitemapCount, sitemapEntriesForPage } from "@/lib/seo";

export const dynamic = "force-static";
export const dynamicParams = false;

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

export function generateStaticParams() {
  return Array.from({ length: getSitemapCount() }, (_, id) => ({ id: `${id}.xml` }));
}

export async function GET(_request: Request, { params }: RouteContext<"/sitemap/[id]">) {
  const { id } = await params;
  const page = Number(id.replace(/\.xml$/, ""));
  const entries = sitemapEntriesForPage(Number.isFinite(page) ? page : 0)
    .map((entry) => {
      const lastModified =
        entry.lastModified instanceof Date ? entry.lastModified.toISOString() : entry.lastModified;

      return [
        "  <url>",
        `    <loc>${escapeXml(entry.url)}</loc>`,
        lastModified ? `    <lastmod>${escapeXml(lastModified)}</lastmod>` : "",
        entry.changeFrequency ? `    <changefreq>${entry.changeFrequency}</changefreq>` : "",
        entry.priority ? `    <priority>${entry.priority}</priority>` : "",
        "  </url>",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  return new Response(
    [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      entries,
      "</urlset>",
    ].join("\n"),
    {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate",
      },
    },
  );
}
