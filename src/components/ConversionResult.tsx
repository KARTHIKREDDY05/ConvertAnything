import Link from "next/link";
import type { Conversion } from "@/types/conversion";
import { generateConversionTable, getFeetAndInches, formatNumber } from "@/lib/engine";
import { getInternalLinks } from "@/lib/seo";
import { slugForConversion } from "@/lib/conversions";

interface ConversionResultProps {
  conversion: Conversion;
  valueExplicit?: boolean;
}

export default function ConversionResult({ conversion, valueExplicit = false }: ConversionResultProps) {
  const { fromValue, fromUnit, toUnit, result, category } = conversion;
  const table = generateConversionTable(fromUnit.id, toUnit.id);
  const links = getInternalLinks(fromUnit.id, toUnit.id);
  const feetAndInches = category.id === "length" && toUnit.id === "foot" ? getFeetAndInches(fromValue, fromUnit.id) : null;

  return (
    <div className="space-y-10">
      <section className="border-y border-slate-200 bg-white py-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">Answer</p>
        <p className="mt-3 text-4xl font-bold text-slate-950 sm:text-5xl">
          {formatNumber(fromValue)} {fromUnit.slug} = {formatNumber(result)} {toUnit.pluralName}
        </p>
        {feetAndInches ? (
          <p className="mt-4 text-xl text-slate-700">
            {feetAndInches.feet} feet {formatNumber(feetAndInches.inches, 2)} inches
          </p>
        ) : null}
      </section>

      <section className="grid gap-5 md:grid-cols-2">
        <div className="rounded-md border border-slate-200 bg-white p-5">
          <h2 className="text-xl font-semibold text-slate-950">Conversion Formula</h2>
          <p className="mt-3 font-mono text-sm text-slate-700">{conversion.formula}</p>
        </div>
        <div className="rounded-md border border-slate-200 bg-white p-5">
          <h2 className="text-xl font-semibold text-slate-950">Calculation</h2>
          <p className="mt-3 text-slate-700">{conversion.calculation}</p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-slate-950">Conversion Table</h2>
        <div className="mt-4 overflow-hidden rounded-md border border-slate-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-100 text-slate-700">
              <tr>
                <th className="px-4 py-3">{fromUnit.pluralName}</th>
                <th className="px-4 py-3">{toUnit.pluralName}</th>
              </tr>
            </thead>
            <tbody>
              {table.map((row) => (
                <tr key={row.fromValue} className="border-t border-slate-200">
                  <td className="px-4 py-3">
                    {formatNumber(row.fromValue)} {fromUnit.symbol}
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-950">
                    {formatNumber(row.toValue)} {toUnit.symbol}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-semibold text-slate-950">Reverse Converter</h2>
          <Link
            href={slugForConversion(toUnit.id, fromUnit.id, valueExplicit ? fromValue : undefined)}
            className="mt-4 block rounded-md border border-slate-200 bg-white p-4 font-medium text-teal-800 transition hover:border-teal-300"
          >
            {valueExplicit ? `${formatNumber(fromValue)} ` : ""}
            {toUnit.slug} to {fromUnit.slug}
          </Link>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-slate-950">Related Conversions</h2>
          <div className="mt-4 grid gap-2">
            {links.slice(0, 8).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-800 transition hover:border-teal-300 hover:text-teal-800"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-slate-950">FAQ</h2>
        <div className="mt-4 divide-y divide-slate-200 rounded-md border border-slate-200 bg-white">
          <details className="p-4" open>
            <summary className="cursor-pointer font-semibold text-slate-950">
              How do you convert {fromUnit.pluralName} to {toUnit.pluralName}?
            </summary>
            <p className="mt-2 text-slate-700">{conversion.formula}. For this page, {conversion.calculation}.</p>
          </details>
          <details className="p-4">
            <summary className="cursor-pointer font-semibold text-slate-950">How accurate is this result?</summary>
            <p className="mt-2 text-slate-700">
              ConvertAnything uses standard conversion factors and rounds display values to five decimal places.
            </p>
          </details>
          <details className="p-4">
            <summary className="cursor-pointer font-semibold text-slate-950">Can I convert a different value?</summary>
            <p className="mt-2 text-slate-700">
              Yes. Change the number in the URL or use the search box on the homepage.
            </p>
          </details>
        </div>
      </section>
    </div>
  );
}
