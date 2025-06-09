export const formatCurrency = (amount: number, currency = "USD"): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

export const formatCurrencyCompact = (amount: number, currency = "USD"): string => {
  if (Math.abs(amount) >= 1000000) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      notation: "compact",
      compactDisplay: "short",
    }).format(amount)
  }

  return formatCurrency(amount, currency)
}

export const parseCurrency = (value: string): number => {
  // Remove currency symbols and parse as float
  const cleaned = value.replace(/[^0-9.-]/g, "")
  const parsed = Number.parseFloat(cleaned)
  return isNaN(parsed) ? 0 : parsed
}
