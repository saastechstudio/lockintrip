import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const euro = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

export function formatPrice(amount: number) {
  return euro.format(amount);
}

const euroCents = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", minimumFractionDigits: 2, maximumFractionDigits: 2 });

/** Montant d'une échéance (centimes affichés seulement s'il y en a, ex. 497,50 €). */
export function formatInstallment(total: number, count: number) {
  const v = Math.round((total / count) * 100) / 100;
  return Number.isInteger(v) ? euro.format(v) : euroCents.format(v);
}

const day = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", timeZone: "UTC" });

export function formatDay(iso: string) {
  return day.format(new Date(`${iso}T00:00:00Z`));
}
