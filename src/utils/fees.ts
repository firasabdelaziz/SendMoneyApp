/**
 * Calculates the transaction fee based on the provided amount.
 * 
 * @param {number} amount - The amount of money being transferred in TND.
 * @returns {number} - The calculated transaction fee in TND.
 * 
 * If the amount is less than or equal to 20 TND, a fixed fee of 5 millimes is applied.
 * For amounts greater than 20 TND, a fee of 1% is calculated, with a maximum fee cap of 3 TND.
 */
export const calculateFees = (amount: number): number => {
  // If the amount is less than or equal to 20 TND, apply a fee of 5 millimes (0.005 TND)
  if (amount <= 20) {
    return 0.005; // 5 millimes for amounts <= 20 TND
  }

  // For amounts greater than 20 TND, apply a fee of 1% of the amount
  const fee = amount * 0.01; // 1% for amounts > 20 TND

  // Cap the fee at 3 TND to prevent excessive fees for large amounts
  return Math.min(fee, 3); // Cap at 3 TND
};
