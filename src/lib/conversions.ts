import type { ConversionCategory, ConversionUnit } from "@/types/conversion";

const unit = (
  id: string,
  name: string,
  pluralName: string,
  symbol: string,
  slug: string,
  toBase: number | undefined,
  aliases: string[] = [],
): ConversionUnit => ({
  id,
  name,
  pluralName,
  symbol,
  slug,
  toBase,
  aliases: [id, slug, symbol, name, pluralName, ...aliases],
});

export const conversionCategories: Record<string, ConversionCategory> = {
  length: {
    id: "length",
    name: "Length",
    baseUnit: "meter",
    description: "Convert distance and length units.",
    units: {
      meter: unit("meter", "meter", "meters", "m", "meters", 1, ["metre", "metres"]),
      kilometer: unit("kilometer", "kilometer", "kilometers", "km", "km", 1000, ["kilometre", "kilometres"]),
      centimeter: unit("centimeter", "centimeter", "centimeters", "cm", "cm", 0.01, ["centimetre", "centimetres"]),
      millimeter: unit("millimeter", "millimeter", "millimeters", "mm", "mm", 0.001, ["millimetre", "millimetres"]),
      inch: unit("inch", "inch", "inches", "in", "inches", 0.0254, ["inch", "in"]),
      foot: unit("foot", "foot", "feet", "ft", "feet", 0.3048, ["ft"]),
      yard: unit("yard", "yard", "yards", "yd", "yards", 0.9144),
      mile: unit("mile", "mile", "miles", "mi", "miles", 1609.344, ["mi"]),
      nautical_mile: unit("nautical_mile", "nautical mile", "nautical miles", "nmi", "nautical-miles", 1852, ["nmi"]),
    },
  },
  weight: {
    id: "weight",
    name: "Weight",
    baseUnit: "kilogram",
    description: "Convert weight and mass units.",
    units: {
      kilogram: unit("kilogram", "kilogram", "kilograms", "kg", "kg", 1, ["kgs"]),
      gram: unit("gram", "gram", "grams", "g", "grams", 0.001),
      milligram: unit("milligram", "milligram", "milligrams", "mg", "mg", 0.000001),
      pound: unit("pound", "pound", "pounds", "lb", "lbs", 0.45359237, ["lb", "pounds"]),
      ounce: unit("ounce", "ounce", "ounces", "oz", "ounces", 0.028349523125, ["oz"]),
      stone: unit("stone", "stone", "stone", "st", "stone", 6.35029318, ["stones"]),
      metric_ton: unit("metric_ton", "metric ton", "metric tons", "t", "metric-tons", 1000, ["tonne", "tonnes", "tons"]),
    },
  },
  temperature: {
    id: "temperature",
    name: "Temperature",
    baseUnit: "celsius",
    description: "Convert Celsius, Fahrenheit, and Kelvin.",
    units: {
      celsius: unit("celsius", "Celsius", "Celsius", "deg C", "celsius", undefined, ["c", "centigrade"]),
      fahrenheit: unit("fahrenheit", "Fahrenheit", "Fahrenheit", "deg F", "fahrenheit", undefined, ["f"]),
      kelvin: unit("kelvin", "Kelvin", "Kelvin", "K", "kelvin", undefined, ["k"]),
    },
  },
  area: {
    id: "area",
    name: "Area",
    baseUnit: "square_meter",
    description: "Convert surface area units.",
    units: {
      square_meter: unit("square_meter", "square meter", "square meters", "sq m", "square-meters", 1, ["m2"]),
      square_kilometer: unit("square_kilometer", "square kilometer", "square kilometers", "sq km", "square-kilometers", 1000000, ["km2"]),
      square_centimeter: unit("square_centimeter", "square centimeter", "square centimeters", "sq cm", "square-centimeters", 0.0001, ["cm2"]),
      square_foot: unit("square_foot", "square foot", "square feet", "sq ft", "square-feet", 0.09290304, ["ft2"]),
      square_inch: unit("square_inch", "square inch", "square inches", "sq in", "square-inches", 0.00064516, ["in2"]),
      square_yard: unit("square_yard", "square yard", "square yards", "sq yd", "square-yards", 0.83612736, ["yd2"]),
      acre: unit("acre", "acre", "acres", "ac", "acres", 4046.8564224),
      hectare: unit("hectare", "hectare", "hectares", "ha", "hectares", 10000),
      square_mile: unit("square_mile", "square mile", "square miles", "sq mi", "square-miles", 2589988.110336, ["mi2"]),
    },
  },
  volume: {
    id: "volume",
    name: "Volume",
    baseUnit: "liter",
    description: "Convert liquid volume and capacity units.",
    units: {
      liter: unit("liter", "liter", "liters", "L", "liters", 1, ["litre", "litres", "l"]),
      milliliter: unit("milliliter", "milliliter", "milliliters", "mL", "ml", 0.001, ["millilitre", "millilitres"]),
      cubic_meter: unit("cubic_meter", "cubic meter", "cubic meters", "cu m", "cubic-meters", 1000, ["m3"]),
      cubic_centimeter: unit("cubic_centimeter", "cubic centimeter", "cubic centimeters", "cu cm", "cubic-centimeters", 0.001, ["cm3", "cc"]),
      gallon_us: unit("gallon_us", "US gallon", "US gallons", "gal", "gallons", 3.785411784, ["gallon"]),
      gallon_imperial: unit("gallon_imperial", "imperial gallon", "imperial gallons", "imp gal", "imperial-gallons", 4.54609),
      pint_us: unit("pint_us", "US pint", "US pints", "pt", "pints", 0.473176473),
      cup: unit("cup", "cup", "cups", "cup", "cups", 0.2365882365),
      fluid_ounce: unit("fluid_ounce", "fluid ounce", "fluid ounces", "fl oz", "fluid-ounces", 0.0295735295625),
    },
  },
  speed: {
    id: "speed",
    name: "Speed",
    baseUnit: "meter_per_second",
    description: "Convert speed and velocity units.",
    units: {
      meter_per_second: unit("meter_per_second", "meter per second", "meters per second", "m/s", "meters-per-second", 1),
      kilometer_per_hour: unit("kilometer_per_hour", "kilometer per hour", "kilometers per hour", "km/h", "kmh", 0.2777777778, ["kph"]),
      mile_per_hour: unit("mile_per_hour", "mile per hour", "miles per hour", "mph", "mph", 0.44704),
      foot_per_second: unit("foot_per_second", "foot per second", "feet per second", "ft/s", "feet-per-second", 0.3048),
      knot: unit("knot", "knot", "knots", "kn", "knots", 0.5144444444),
    },
  },
  time: {
    id: "time",
    name: "Time",
    baseUnit: "second",
    description: "Convert time units.",
    units: {
      millisecond: unit("millisecond", "millisecond", "milliseconds", "ms", "milliseconds", 0.001),
      second: unit("second", "second", "seconds", "s", "seconds", 1),
      minute: unit("minute", "minute", "minutes", "min", "minutes", 60),
      hour: unit("hour", "hour", "hours", "h", "hours", 3600, ["hr", "hrs"]),
      day: unit("day", "day", "days", "d", "days", 86400),
      week: unit("week", "week", "weeks", "wk", "weeks", 604800),
      month: unit("month", "month", "months", "mo", "months", 2629800),
      year: unit("year", "year", "years", "yr", "years", 31557600),
    },
  },
  "digital-storage": {
    id: "digital-storage",
    name: "Digital Storage",
    baseUnit: "byte",
    description: "Convert bytes, bits, and file storage units.",
    units: {
      bit: unit("bit", "bit", "bits", "bit", "bits", 0.125),
      byte: unit("byte", "byte", "bytes", "B", "bytes", 1),
      kilobyte: unit("kilobyte", "kilobyte", "kilobytes", "KB", "kb", 1024),
      megabyte: unit("megabyte", "megabyte", "megabytes", "MB", "mb", 1048576),
      gigabyte: unit("gigabyte", "gigabyte", "gigabytes", "GB", "gb", 1073741824),
      terabyte: unit("terabyte", "terabyte", "terabytes", "TB", "tb", 1099511627776),
      petabyte: unit("petabyte", "petabyte", "petabytes", "PB", "pb", 1125899906842624),
      kilobit: unit("kilobit", "kilobit", "kilobits", "Kb", "kilobits", 125),
      megabit: unit("megabit", "megabit", "megabits", "Mb", "megabits", 125000),
    },
  },
  pressure: {
    id: "pressure",
    name: "Pressure",
    baseUnit: "pascal",
    description: "Convert pressure units.",
    units: {
      pascal: unit("pascal", "pascal", "pascals", "Pa", "pascals", 1, ["pa"]),
      kilopascal: unit("kilopascal", "kilopascal", "kilopascals", "kPa", "kpa", 1000),
      bar: unit("bar", "bar", "bar", "bar", "bar", 100000),
      atmosphere: unit("atmosphere", "atmosphere", "atmospheres", "atm", "atm", 101325),
      psi: unit("psi", "PSI", "PSI", "psi", "psi", 6894.757293),
      mmhg: unit("mmhg", "millimeter of mercury", "millimeters of mercury", "mmHg", "mmhg", 133.322387415),
    },
  },
  energy: {
    id: "energy",
    name: "Energy",
    baseUnit: "joule",
    description: "Convert work, heat, and energy units.",
    units: {
      joule: unit("joule", "joule", "joules", "J", "joules", 1),
      kilojoule: unit("kilojoule", "kilojoule", "kilojoules", "kJ", "kj", 1000),
      calorie: unit("calorie", "calorie", "calories", "cal", "calories", 4.184),
      kilocalorie: unit("kilocalorie", "kilocalorie", "kilocalories", "kcal", "kcal", 4184),
      watt_hour: unit("watt_hour", "watt hour", "watt hours", "Wh", "watt-hours", 3600, ["wh"]),
      kilowatt_hour: unit("kilowatt_hour", "kilowatt hour", "kilowatt hours", "kWh", "kwh", 3600000),
      btu: unit("btu", "BTU", "BTU", "BTU", "btu", 1055.05585262),
    },
  },
  power: {
    id: "power",
    name: "Power",
    baseUnit: "watt",
    description: "Convert power units.",
    units: {
      watt: unit("watt", "watt", "watts", "W", "watts", 1),
      kilowatt: unit("kilowatt", "kilowatt", "kilowatts", "kW", "kw", 1000),
      megawatt: unit("megawatt", "megawatt", "megawatts", "MW", "mw", 1000000),
      horsepower: unit("horsepower", "horsepower", "horsepower", "hp", "horsepower", 745.699871582),
      btu_per_hour: unit("btu_per_hour", "BTU per hour", "BTU per hour", "BTU/h", "btu-per-hour", 0.29307107),
    },
  },
  angles: {
    id: "angles",
    name: "Angles",
    baseUnit: "degree",
    description: "Convert angle units.",
    units: {
      degree: unit("degree", "degree", "degrees", "deg", "degrees", 1),
      radian: unit("radian", "radian", "radians", "rad", "radians", 180 / Math.PI),
      gradian: unit("gradian", "gradian", "gradians", "grad", "gradians", 0.9),
      arcminute: unit("arcminute", "arcminute", "arcminutes", "arcmin", "arcminutes", 1 / 60),
      arcsecond: unit("arcsecond", "arcsecond", "arcseconds", "arcsec", "arcseconds", 1 / 3600),
    },
  },
};

const unitById = new Map<string, ConversionUnit>();
const aliases = new Map<string, string>();

const normalizeAlias = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/\+/g, " plus ")
    .replace(/[^a-z0-9./\s-]/g, "")
    .replace(/\s+/g, " ")
    .replace(/_/g, "-");

Object.values(conversionCategories).forEach((category) => {
  Object.values(category.units).forEach((entry) => {
    unitById.set(entry.id, entry);
    entry.aliases.forEach((alias) => {
      aliases.set(normalizeAlias(alias), entry.id);
      aliases.set(normalizeAlias(alias).replace(/\s+/g, "-"), entry.id);
    });
  });
});

export const highValuePairs = [
  ["kilogram", "pound"],
  ["pound", "kilogram"],
  ["centimeter", "inch"],
  ["inch", "centimeter"],
  ["centimeter", "foot"],
  ["foot", "centimeter"],
  ["meter", "foot"],
  ["foot", "meter"],
  ["kilometer", "mile"],
  ["mile", "kilometer"],
  ["celsius", "fahrenheit"],
  ["fahrenheit", "celsius"],
  ["megabyte", "gigabyte"],
  ["gigabyte", "megabyte"],
  ["liter", "gallon_us"],
  ["gallon_us", "liter"],
  ["kilometer_per_hour", "mile_per_hour"],
  ["mile_per_hour", "kilometer_per_hour"],
  ["square_meter", "square_foot"],
  ["square_foot", "square_meter"],
  ["psi", "kilopascal"],
  ["kilopascal", "psi"],
  ["kilowatt_hour", "joule"],
  ["joule", "kilowatt_hour"],
  ["watt", "horsepower"],
  ["horsepower", "watt"],
  ["degree", "radian"],
  ["radian", "degree"],
] as const;

export const indexableValues = [
  0.5, 1, 2, 3, 5, 10, 12, 15, 20, 25, 30, 40, 50, 60, 75, 80, 90, 100, 120,
  150, 160, 170, 175, 180, 185, 200, 250, 500, 1000,
];

export const tableValues = [1, 5, 10, 20, 50, 75, 100];
export const sitemapPageSize = 45000;

export const getUnitById = (id: string) => unitById.get(id) ?? null;

export const normalizeUnit = (value: string): string | null => {
  const normalized = normalizeAlias(value);
  return aliases.get(normalized) ?? aliases.get(normalized.replace(/\s+/g, "-")) ?? null;
};

export const getCategoryForUnit = (unitId: string): ConversionCategory | null =>
  Object.values(conversionCategories).find((category) => Boolean(category.units[unitId])) ?? null;

export const findConversionPath = (
  fromUnitId: string,
  toUnitId: string,
): { category: ConversionCategory; fromUnit: ConversionUnit; toUnit: ConversionUnit } | null => {
  for (const category of Object.values(conversionCategories)) {
    const fromUnit = category.units[fromUnitId];
    const toUnit = category.units[toUnitId];
    if (fromUnit && toUnit) {
      return { category, fromUnit, toUnit };
    }
  }
  return null;
};

export const getAllUnits = () =>
  Array.from(unitById.values()).sort((a, b) => a.name.localeCompare(b.name));

export const slugForConversion = (fromUnitId: string, toUnitId: string, value?: number) => {
  const fromUnit = getUnitById(fromUnitId);
  const toUnit = getUnitById(toUnitId);
  if (!fromUnit || !toUnit) return "/";
  const prefix = value === undefined ? "" : `${value}-`;
  return `/convert/${prefix}${fromUnit.slug}-to-${toUnit.slug}`;
};

export const getIndexableConversionSlugs = () => {
  const slugs = new Set<string>();

  highValuePairs.forEach(([from, to]) => {
    slugs.add(slugForConversion(from, to).replace("/convert/", ""));
    indexableValues.forEach((value) => {
      slugs.add(slugForConversion(from, to, value).replace("/convert/", ""));
    });
  });

  Object.values(conversionCategories).forEach((category) => {
    const units = Object.keys(category.units);
    units.forEach((from) => {
      units.forEach((to) => {
        if (from !== to) {
          slugs.add(slugForConversion(from, to).replace("/convert/", ""));
        }
      });
    });
  });

  return Array.from(slugs);
};

export const isIndexableValuePage = (fromUnitId: string, toUnitId: string, value?: number) => {
  if (value === undefined) return true;
  return highValuePairs.some(([from, to]) => from === fromUnitId && to === toUnitId) && indexableValues.includes(value);
};
