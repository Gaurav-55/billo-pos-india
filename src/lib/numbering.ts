import type { Business, NumberingConfig } from "./types";

function today(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate(),
  ).padStart(2, "0")}`;
}

function peek(cfg: NumberingConfig): { value: number; date: string } {
  const date = today();
  const value = cfg.resetDaily && cfg.lastResetDate !== date ? 1 : cfg.next;
  return { value, date };
}

export function formatNumber(cfg: NumberingConfig, value: number): string {
  return `${cfg.prefix ?? ""}${value}`;
}

/** Numbers that WOULD be used for the next bill, without consuming them. */
export function peekNumbers(business: Business) {
  const bill = peek(business.billNumbering);
  const token = peek(business.tokenNumbering);
  return {
    billNumber: formatNumber(business.billNumbering, bill.value),
    tokenNumber: formatNumber(business.tokenNumbering, token.value),
  };
}

/** Returns the numbers plus the business object with counters advanced. */
export function consumeNumbers(business: Business): {
  billNumber: string;
  tokenNumber: string;
  business: Business;
} {
  const bill = peek(business.billNumbering);
  const token = peek(business.tokenNumbering);
  return {
    billNumber: formatNumber(business.billNumbering, bill.value),
    tokenNumber: formatNumber(business.tokenNumbering, token.value),
    business: {
      ...business,
      billNumbering: {
        ...business.billNumbering,
        next: bill.value + 1,
        lastResetDate: business.billNumbering.resetDaily
          ? bill.date
          : business.billNumbering.lastResetDate,
      },
      tokenNumbering: {
        ...business.tokenNumbering,
        next: token.value + 1,
        lastResetDate: business.tokenNumbering.resetDaily
          ? token.date
          : business.tokenNumbering.lastResetDate,
      },
    },
  };
}
