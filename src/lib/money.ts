/** All money is stored as integer paise. Never floats. */

export function rupeesToPaise(input: string | number): number {
  const s = String(input).trim();
  if (s === "") return 0;
  const n = Number(s);
  if (!Number.isFinite(n)) return 0;
  return Math.round(n * 100);
}

export function paiseToRupeeString(paise: number): string {
  const sign = paise < 0 ? "-" : "";
  const abs = Math.abs(Math.round(paise));
  return `${sign}${Math.floor(abs / 100)}.${String(abs % 100).padStart(2, "0")}`;
}

export function formatMoney(paise: number, currency = "₹"): string {
  return `${currency}${paiseToRupeeString(paise)}`;
}

/** qty x unit price, rounded at the paisa boundary. */
export function lineAmount(qty: number, unitPricePaise: number): number {
  return Math.round(qty * unitPricePaise);
}

/** Percentage of a paise amount, rounded to nearest paisa. */
export function percentOf(paise: number, percent: number): number {
  return Math.round((paise * percent) / 100);
}
