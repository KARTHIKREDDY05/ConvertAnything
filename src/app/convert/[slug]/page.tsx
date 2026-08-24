import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ConversionResult from "@/components/ConversionResult";
import { getIndexableConversionSlugs, isIndexableValuePage, slugForConversion } from "@/lib/conversions";
import { performConversion } from "@/lib/engine";
import { absoluteUrl, valuePagesAreCurated } from "@/lib/seo";
import { conversionTitle, generateConversionMetadata, parseConversionSlug } from "@/lib/utils";

export const dynamicParams = false;

export async function generateStaticParams() {
  return getIndexableConversionSlugs()
    .slice(0, 1000)
    .map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/convert/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const parsed = parseConversionSlug(slug);

  if (!parsed) {
    return {
      title: "Conversion not found",
      robots: { index: false, follow: false },
    };
  }

  const metadata = generateConversionMetadata(parsed.fromUnitId, parsed.toUnitId, parsed.value);
  const canonical = slugForConversion(parsed.fromUnitId, parsed.toUnitId, parsed.value);
  const shouldIndex = isIndexableValuePage(parsed.fromUnitId, parsed.toUnitId, parsed.value);

  return {
    title: metadata.title,
    description: metadata.description,
    alternates: { canonical },
    robots: { index: shouldIndex, follow: true },
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      url: absoluteUrl(canonical),
      type: "website",
    },
  };
}

export default async function ConvertPage({ params }: PageProps<"/convert/[slug]">) {
  const { slug } = await params;
  const parsed = parseConversionSlug(slug);

  if (!parsed) notFound();

  const conversion = performConversion(parsed.value ?? 1, parsed.fromUnitId, parsed.toUnitId);
  if (!conversion) notFound();

  const heading = conversionTitle(parsed.fromUnitId, parsed.toUnitId, parsed.value);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/" className="font-semibold text-slate-950">
            ConvertAnything
          </Link>
          <Link href={`/category/${conversion.category.id}`} className="text-sm font-medium text-teal-800">
            {conversion.category.name}
          </Link>
        </div>
      </nav>

      <article className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">{conversion.category.name} converter</p>
        <h1 className="mt-3 text-4xl font-bold tracking-normal sm:text-6xl">{heading}</h1>
        <p className="mt-4 max-w-3xl text-slate-600">
          Convert {conversion.fromUnit.pluralName} to {conversion.toUnit.pluralName} with the formula, worked calculation,
          conversion table, reverse converter, and related conversion links.
        </p>
        {parsed.value !== undefined && !isIndexableValuePage(parsed.fromUnitId, parsed.toUnitId, parsed.value) ? (
          <p className="mt-4 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            {valuePagesAreCurated()}
          </p>
        ) : null}
        <div className="mt-10">
          <ConversionResult conversion={conversion} valueExplicit={parsed.value !== undefined} />
        </div>
      </article>
    </main>
  );
}
