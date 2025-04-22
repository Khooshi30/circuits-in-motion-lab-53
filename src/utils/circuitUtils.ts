
/**
 * Utility functions for circuit calculations
 */

export type Current = {
  id: string;
  value: number;
  direction: 'in' | 'out';
  label: string;
};

export type Voltage = {
  id: string;
  value: number;
  label: string;
};

export type Resistance = {
  id: string;
  value: number;
  label: string;
};

/**
 * Checks if Kirchhoff's Current Law is satisfied at a node
 * Sum of currents entering = Sum of currents leaving
 */
export function checkKCL(currents: Current[]): {
  isValid: boolean;
  inSum: number;
  outSum: number;
  difference: number;
} {
  const inCurrent = currents
    .filter(c => c.direction === 'in')
    .reduce((sum, curr) => sum + curr.value, 0);
    
  const outCurrent = currents
    .filter(c => c.direction === 'out')
    .reduce((sum, curr) => sum + curr.value, 0);
    
  // Allow for small floating point errors
  const isValid = Math.abs(inCurrent - outCurrent) < 0.00001;
  
  return {
    isValid,
    inSum: inCurrent,
    outSum: outCurrent,
    difference: Math.abs(inCurrent - outCurrent)
  };
}

/**
 * Calculates current through a resistor using I = V/R
 */
export function calculateCurrent(voltage: number, resistance: number): number {
  return voltage / resistance;
}

/**
 * Calculates voltage across a component using V = IR
 */
export function calculateVoltage(current: number, resistance: number): number {
  return current * resistance;
}

/**
 * Checks if Kirchhoff's Voltage Law is satisfied in a loop
 * Sum of voltages around a loop = 0
 */
export function checkKVL(voltages: Voltage[]): {
  isValid: boolean;
  sum: number;
} {
  const sum = voltages.reduce((total, v) => total + v.value, 0);
  
  // Allow for small floating point errors
  const isValid = Math.abs(sum) < 0.00001;
  
  return {
    isValid,
    sum
  };
}

/**
 * Formats a number to a specified number of decimal places
 */
export function formatNumber(num: number, decimals: number = 2): string {
  return num.toFixed(decimals);
}

/**
 * Converts a number to a string with the appropriate units
 */
export function formatWithUnit(
  value: number, 
  unit: 'A' | 'V' | 'Ω', 
  decimals: number = 2
): string {
  return `${formatNumber(value, decimals)} ${unit}`;
}
