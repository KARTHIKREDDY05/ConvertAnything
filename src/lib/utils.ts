import type { ParsedConversion } from "@/types/conversion";
import { getUnitById, normalizeUnit, slugForConversion } from "./conversions";
import { performConversion, formatNumber } from "./engine";

const numberPattern = "-?\\d+(?:\\.\\d+)?";

export { normalizeUnit };

export const parseConversionSlug = (slug: string): ParsedConversion | null => {
  const decoded = decodeURIComponent(slug).toLowerCase();
  const valueMatch = decoded.match(new RegExp(`^(${numberPattern})-(.+)$`));
  const value = valueMatch ? Number(valueMatch[1]) : undefined;
  const rest = valueMatch ? valueMatch[2] : decoded;
  const marker = "-to-";
  const markerIndex = rest.indexOf(marker);

  if (markerIndex === -1) return null;

  const fromRaw = rest.slice(0, markerIndex);
  const toRaw = rest.slice(markerIndex + marker.length);
  const fromUnitId = normalizeUnit(fromRaw);
  const toUnitId = normalizeUnit(toRaw);

  if (!fromUnitId || !toUnitId) return null;
  return { value, fromUnitId, toUnitId };
};

export const parseSearchQuery = (query: string): ParsedConversion | null => {
  const cleaned = query.trim().toLowerCase().replace(/\s+/g, " ");
  const valuePattern = new RegExp(`^(${numberPattern})\\s+(.+?)\\s+(?:to|in|into)\\s+(.+)$`);
  const pairPattern = /^(.+?)\s+(?:to|in|into)\s+(.+)$/;
  const match = cleaned.match(valuePattern) ?? cleaned.match(pairPattern);

  if (!match) return null;

  const hasValue = match.length === 4;
  const value = hasValue ? Number(match[1]) : undefined;
  const fromRaw = hasValue ? match[2] : match[1];
  const toRaw = hasValue ? match[3] : match[2];
  const fromUnitId = normalizeUnit(fromRaw);
  const toUnitId = normalizeUnit(toRaw);

  if (!fromUnitId || !toUnitId) return null;
  return { value, fromUnitId, toUnitId };
};

export const hrefForParsedConversion = (parsed: ParsedConversion) =>
  slugForConversion(parsed.fromUnitId, parsed.toUnitId, parsed.value);

export const conversionTitle = (fromUnitId: string, toUnitId: string, value?: number) => {
  const fromUnit = getUnitById(fromUnitId);
  const toUnit = getUnitById(toUnitId);
  if (!fromUnit || !toUnit) return "Unit conversion";
  const prefix = value === undefined ? "" : `${formatNumber(value)} `;
  return `${prefix}${fromUnit.slug} to ${toUnit.slug}`;
};

export const generateConversionMetadata = (fromUnitId: string, toUnitId: string, value?: number) => {
  const fromUnit = getUnitById(fromUnitId);
  const toUnit = getUnitById(toUnitId);
  const conversion = performConversion(value ?? 1, fromUnitId, toUnitId);

  if (!fromUnit || !toUnit || !conversion) {
    return {
      title: "Conversion not found | ConvertAnything",
      description: "Find fast unit conversions with ConvertAnything.",
      h1: "Conversion not found",
    };
  }

  if (value !== undefined) {
    const h1 = conversionTitle(fromUnitId, toUnitId, value);
    return {
      title: `${h1} - ${formatNumber(conversion.result)} ${toUnit.pluralName}`,
      description: `${formatNumber(value)} ${fromUnit.slug} equals ${formatNumber(conversion.result)} ${toUnit.pluralName}. See the formula, calculation, table, reverse converter, and FAQs.`,
      h1,
    };
  }

  return {
    title: `${fromUnit.pluralName} to ${toUnit.pluralName} converter`,
    description: `Convert ${fromUnit.pluralName} to ${toUnit.pluralName} instantly. Includes formula, calculation examples, conversion table, reverse converter, and related conversions.`,
    h1: `${fromUnit.pluralName} to ${toUnit.pluralName} converter`,
  };
};
