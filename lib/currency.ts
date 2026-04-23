export function formatCurrency(
  amount: number,
  symbol: string = '₦'
): string {
  const formatted = Math.abs(amount)
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return `${symbol}${formatted}`
}

export function formatCompact(amount: number, symbol: string = '₦'): string {
  if (amount >= 1_000_000) {
    return `${symbol}${(amount / 1_000_000).toFixed(1)}M`
  }
  if (amount >= 1_000) {
    return `${symbol}${(amount / 1_000).toFixed(1)}K`
  }
  return formatCurrency(amount, symbol)
}