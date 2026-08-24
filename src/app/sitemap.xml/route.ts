import { absoluteUrl, getSitemapCount } from "@/lib/seo";

export const dynamic = "force-static";

export function GET() {
  const lastModified = "2026-08-24T00:00:00.000Z";
  const entries = Array.from({ length: getSitemapCount() }, (_, id) => {
    return [
      "  <sitemap>",
      `    <loc>${absoluteUrl(`/sitemap/${id}.xml`)}</loc>`,
      `    <lastmod>${lastModified}</lastmod>`,
      "  </sitemap>",
    ].join("\n");
  }).join("\n");

  return new Response(
    [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      entries,
      "</sitemapindex>",
    ].join("\n"),
    {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate",
      },
    },
  );
}
