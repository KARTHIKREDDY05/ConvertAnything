import type { Conversion, ConversionTableRow } from "@/types/conversion";
import { findConversionPath, getUnitById, tableValues } from "./conversions";

export const formatNumber = (value: number, maxDecimals = 5) => {
  if (!Number.isFinite(value)) return "0";
  const fixed = Number(value.toFixed(maxDecimals));
  return fixed.toLocaleString("en-US", { maximumFractionDigits: maxDecimals });
};

const round = (value: number, decimals = 5) => Number(value.toFixed(decimals));

const toCelsius = (value: number, unitId: string) => {
  if (unitId === "fahrenheit") return (value - 32) * (5 / 9);
  if (unitId === "kelvin") return value - 273.15;
  return value;
};

const fromCelsius = (value: number, unitId: string) => {
  if (unitId === "fahrenheit") return value * (9 / 5) + 32;
  if (unitId === "kelvin") return value + 273.15;
  return value;
};

const temperatureFormula = (fromUnitId: string, toUnitId: string) => {
  if (fromUnitId === "celsius" && toUnitId === "fahrenheit") return "(C x 9/5) + 32";
  if (fromUnitId === "fahrenheit" && toUnitId === "celsius") return "(F - 32) x 5/9";
  if (fromUnitId === "celsius" && toUnitId === "kelvin") return "C + 273.15";
  if (fromUnitId === "kelvin" && toUnitId === "celsius") return "K - 273.15";
  if (fromUnitId === "fahrenheit" && toUnitId === "kelvin") return "((F - 32) x 5/9) + 273.15";
  if (fromUnitId === "kelvin" && toUnitId === "fahrenheit") return "((K - 273.15) x 9/5) + 32";
  return "same scale";
};

export const performConversion = (
  fromValue: number,
  fromUnitId: string,
  toUnitId: string,
): Conversion | null => {
  const path = findConversionPath(fromUnitId, toUnitId);
  if (!path || !Number.isFinite(fromValue)) return null;

  const { category, fromUnit, toUnit } = path;

  if (category.id === "temperature") {
    const celsius = toCelsius(fromValue, fromUnit.id);
    const result = round(fromCelsius(celsius, toUnit.id));
    const formula = temperatureFormula(fromUnit.id, toUnit.id);
    return {
      fromValue,
      fromUnit,
      toUnit,
      result,
      category,
      formula,
      calculation: `${formula.replace(/[CFK]/g, String(fromValue))} = ${formatNumber(result)} ${toUnit.pluralName}`,
    };
  }

  const factor = (fromUnit.toBase ?? 1) / (toUnit.toBase ?? 1);
  const result = round(fromValue * factor);

  return {
    fromValue,
    fromUnit,
    toUnit,
    result,
    category,
    factor,
    formula: `multiply the ${fromUnit.name} value by ${formatNumber(factor, 10)}`,
    calculation: `${formatNumber(fromValue)} x ${formatNumber(factor, 10)} = ${formatNumber(result)} ${toUnit.pluralName}`,
  };
};

export const generateConversionTable = (
  fromUnitId: string,
  toUnitId: string,
  values: number[] = tableValues,
): ConversionTableRow[] =>
  values.flatMap((value) => {
    const conversion = performConversion(value, fromUnitId, toUnitId);
    return conversion ? [{ fromValue: value, toValue: conversion.result }] : [];
  });

export const getFeetAndInches = (value: number, fromUnitId: string) => {
  const conversion = performConversion(value, fromUnitId, "foot");
  if (!conversion) return null;
  const feet = Math.floor(conversion.result);
  const inches = round((conversion.result - feet) * 12, 2);
  return { feet, inches };
};

export const getUnitLabel = (unitId: string, value = 2) => {
  const unit = getUnitById(unitId);
  if (!unit) return unitId;
  return Math.abs(value) === 1 ? unit.name : unit.pluralName;
};
