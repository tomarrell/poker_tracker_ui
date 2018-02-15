export const formatCurrency = (value) => {
  if (typeof value !== 'number') return 'N/A';

  const isNegative = value < 0;

  return `${isNegative ? '-' : ''}$${Math.abs(value / 100).toFixed(2)}`;
};
