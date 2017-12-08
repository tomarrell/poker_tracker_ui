export const formatCurrency = (value) => {
  if (!value) return null;
  
  if (typeof value !== 'number') {
    return 'N/A';
  }

  const isNegative = value < 0;

  return `${isNegative ? '-' : ''}$${Math.abs(value)}`;
};
