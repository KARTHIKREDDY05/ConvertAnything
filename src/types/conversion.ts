export type ConversionCategoryId =
  | "length"
  | "weight"
  | "temperature"
  | "area"
  | "volume"
  | "speed"
  | "time"
  | "digital-storage"
  | "pressure"
  | "energy"
  | "power"
  | "angles";

export interface ConversionUnit {
  id: string;
  name: string;
  pluralName: string;
  symbol: string;
  slug: string;
  aliases: string[];
  toBase?: number;
}

export interface ConversionCategory {
  id: ConversionCategoryId;
  name: string;
  baseUnit: string;
  description: string;
  units: Record<string, ConversionUnit>;
}

export interface Conversion {
  fromValue: number;
  fromUnit: ConversionUnit;
  toUnit: ConversionUnit;
  result: number;
  category: ConversionCategory;
  formula: string;
  calculation: string;
  factor?: number;
}

export interface ParsedConversion {
  value?: number;
  fromUnitId: string;
  toUnitId: string;
}

export interface ConversionTableRow {
  fromValue: number;
  toValue: number;
}
