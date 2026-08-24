"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { conversionCategories, slugForConversion } from "@/lib/conversions";

export default function ConversionSearch() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [value, setValue] = useState("1");
  const [categoryId, setCategoryId] = useState("weight");
  const [fromUnitId, setFromUnitId] = useState("kilogram");
  const [toUnitId, setToUnitId] = useState("pound");

  const categories = useMemo(() => Object.values(conversionCategories), []);
  const categoryUnits = useMemo(() => Object.values(conversionCategories[categoryId].units), [categoryId]);

  const selectCategory = (nextCategoryId: string) => {
    const nextUnits = Object.values(conversionCategories[nextCategoryId].units);
    setCategoryId(nextCategoryId);
    setFromUnitId(nextUnits[0].id);
    setToUnitId(nextUnits[1]?.id ?? nextUnits[0].id);
    setError("");
  };

  const submitSelector = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const numericValue = Number(value);

    if (!Number.isFinite(numericValue)) {
      setError("Enter a valid number.");
      return;
    }

    if (fromUnitId === toUnitId) {
      setError("Choose two different units.");
      return;
    }

    setError("");
    router.push(slugForConversion(fromUnitId, toUnitId, numericValue));
  };

  return (
    <div className="w-full">
      <form
        onSubmit={submitSelector}
        className="grid gap-3 rounded-md border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-[1fr_1.2fr_1.2fr_1.2fr_auto]"
      >
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500" htmlFor="value">
            Value
          </label>
          <input
            id="value"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            className="h-11 w-full rounded-md border border-slate-300 px-3 text-slate-950 outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
            inputMode="decimal"
            type="text"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            value={categoryId}
            onChange={(event) => selectCategory(event.target.value)}
            className="h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-slate-950 outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500" htmlFor="from-unit">
            From
          </label>
          <select
            id="from-unit"
            value={fromUnitId}
            onChange={(event) => setFromUnitId(event.target.value)}
            className="h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-slate-950 outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
          >
            {categoryUnits.map((unit) => (
              <option key={unit.id} value={unit.id}>
                {unit.pluralName} ({unit.symbol})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500" htmlFor="to-unit">
            To
          </label>
          <select
            id="to-unit"
            value={toUnitId}
            onChange={(event) => setToUnitId(event.target.value)}
            className="h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-slate-950 outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
          >
            {categoryUnits.map((unit) => (
              <option key={unit.id} value={unit.id}>
                {unit.pluralName} ({unit.symbol})
              </option>
            ))}
          </select>
        </div>

        <button
          className="h-11 self-end rounded-md bg-teal-700 px-5 font-semibold text-white transition hover:bg-slate-950"
          type="submit"
        >
          Convert
        </button>
      </form>

      {error ? <p className="mt-3 text-sm text-red-700">{error}</p> : null}
    </div>
  );
}
