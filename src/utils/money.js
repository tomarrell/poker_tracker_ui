export const formatCurrency = value => {
  let num;

  if (typeof value === "string") num = Number(value);
  else if (typeof value === "number") num = value;

  const isNegative = num < 0;

  return `${isNegative ? "-" : ""}$${Math.abs(num / 100).toFixed(2)}`;
};
