import type { MetadataRoute } from "next";
import {
  conversionCategories,
  getCategoryForUnit,
  getIndexableConversionSlugs,
  highValuePairs,
  indexableValues,
  isIndexableValuePage,
  sitemapPageSize,
  slugForConversion,
} from "./conversions";
import { getUnitLabel } from "./engine";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://convertanything.example";

export const absoluteUrl = (path: string) => new URL(path, siteUrl).toString();

export const getInternalLinks = (fromUnitId: string, toUnitId: string) => {
  const category = getCategoryForUnit(fromUnitId);
  const links = new Map<string, { href: string; label: string }>();

  const add = (href: string, label: string) => links.set(href, { href, label });

  if (category) {
    const alternateUnits = Object.keys(category.units).filter((unitId) => unitId !== fromUnitId && unitId !== toUnitId);
    alternateUnits.slice(0, 5).forEach((unitId) => {
      add(slugForConversion(fromUnitId, unitId), `${getUnitLabel(fromUnitId)} to ${getUnitLabel(unitId)}`);
    });
  }

  add(slugForConversion(toUnitId, fromUnitId), `${getUnitLabel(toUnitId)} to ${getUnitLabel(fromUnitId)}`);

  const usefulValues = [50, 75, 100, 180, 200].filter((value) =>
    isIndexableValuePage(fromUnitId, toUnitId, value),
  );
  usefulValues.forEach((value) => {
    add(slugForConversion(fromUnitId, toUnitId, value), `${value} ${getUnitLabel(fromUnitId, value)} to ${getUnitLabel(toUnitId)}`);
  });

  if (category) add(`/category/${category.id}`, `All ${category.name.toLowerCase()} conversions`);

  highValuePairs
    .filter(([from]) => from === fromUnitId)
    .slice(0, 4)
    .forEach(([from, to]) => {
      add(slugForConversion(from, to), `${getUnitLabel(from)} to ${getUnitLabel(to)}`);
    });

  return Array.from(links.values()).slice(0, 14);
};

export const allSitemapPaths = () => {
  const categoryPaths = Object.keys(conversionCategories).map((id) => `/category/${id}`);
  const conversionPaths = getIndexableConversionSlugs().map((slug) => `/convert/${slug}`);
  return ["/", ...categoryPaths, ...conversionPaths];
};

export const getSitemapCount = () => Math.max(1, Math.ceil(allSitemapPaths().length / sitemapPageSize));

export const sitemapEntriesForPage = (page: number): MetadataRoute.Sitemap => {
  const paths = allSitemapPaths().slice(page * sitemapPageSize, (page + 1) * sitemapPageSize);
  const lastModified = new Date("2026-08-24");

  return paths.map((path) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.includes("/convert/") && !/\d/.test(path) ? 0.9 : 0.7,
  }));
};

export const valuePagesAreCurated = () =>
  `Value-specific pages are limited to ${indexableValues.length} common values on high-demand pairs, while all other numeric pages are served with noindex.`;
