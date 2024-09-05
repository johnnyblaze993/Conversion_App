// Conversion factors relative to the base unit (liter for volume, gram for weight)
const conversionFactors: { [key: string]: number } = {
    cup: 0.24,           // 1 cup = 0.24 liters
    tablespoon: 0.01479,  // 1 tablespoon = 0.01479 liters
    teaspoon: 0.00493,    // 1 teaspoon = 0.00493 liters
    quart: 0.946,         // 1 quart = 0.946 liters
    gallon: 3.785,        // 1 gallon = 3.785 liters
    milliliter: 0.001,    // 1 milliliter = 0.001 liters
    liter: 1,             // base unit for volume
  
    ounce: 28.3495,       // 1 ounce = 28.3495 grams
    pound: 453.592,       // 1 pound = 453.592 grams
    gram: 1,              // base unit for weight
    kilogram: 1000,       // 1 kilogram = 1000 grams
  };
  
  // Categories of units (volume or weight)
  const unitCategories: { [key: string]: string } = {
    cup: 'volume',
    tablespoon: 'volume',
    teaspoon: 'volume',
    quart: 'volume',
    gallon: 'volume',
    milliliter: 'volume',
    liter: 'volume',
    ounce: 'weight',
    pound: 'weight',
    gram: 'weight',
    kilogram: 'weight',
  };
  
  /**
   * Convert between two units of the same category.
   * @param originalMeasurement The original measurement to convert.
   * @param originalUnit The original unit (e.g., cup, gram).
   * @param targetUnit The target unit (e.g., liter, kilogram).
   * @returns The converted measurement or null if the conversion is invalid.
   */
  export const convertMeasurement = (
    originalMeasurement: number,
    originalUnit: string,
    targetUnit: string
  ): number | null => {
    const originalCategory = unitCategories[originalUnit];
    const targetCategory = unitCategories[targetUnit];
  
    // Ensure the units are in the same category (either both volume or both weight)
    if (originalCategory !== targetCategory) {
      console.error('Cannot convert between different categories of units.');
      return null;
    }
  
    // Convert the original measurement to the base unit
    const baseMeasurement = originalMeasurement * conversionFactors[originalUnit];
  
    // Convert from the base unit to the target unit
    const convertedMeasurement = baseMeasurement / conversionFactors[targetUnit];
  
    return convertedMeasurement;
  };
  