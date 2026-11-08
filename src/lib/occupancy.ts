import type { Session } from "@/content/sessions";

export type Occupancy = {
  capacity: number;
  /** Inscriptions réelles. */
  real: number;
  /** Inscrits affichés : max(réel, seuil), plafonné à la capacité. */
  displayed: number;
  /** Places restantes, calculées sur la valeur affichée. */
  remaining: number;
  /** Taux de remplissage affiché, de 0 à 100. */
  percent: number;
  full: boolean;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function toCount(value: number) {
  return Number.isFinite(value) ? Math.max(Math.floor(value), 0) : 0;
}

/**
 * Nombre d'inscrits à afficher : le seuil tant que les inscriptions réelles sont en dessous,
 * le nombre réel au-delà, sans jamais dépasser la capacité.
 */
export function displayedRegistrations(real: number, floor: number, capacity: number) {
  const max = toCount(capacity);
  return clamp(Math.max(toCount(real), toCount(floor)), 0, max);
}

/** Remplissage d'une session tel qu'il doit être affiché (jauges, places restantes). */
export function sessionOccupancy(session: Pick<Session, "capacity" | "taken" | "displayFloor">): Occupancy {
  const capacity = toCount(session.capacity);
  const displayed = displayedRegistrations(session.taken, session.displayFloor, capacity);
  const remaining = capacity - displayed;
  return {
    capacity,
    real: toCount(session.taken),
    displayed,
    remaining,
    percent: capacity ? Math.round((displayed / capacity) * 100) : 0,
    full: remaining <= 0,
  };
}

/** Totaux affichés pour un ensemble de sessions. */
export function editionOccupancy(sessions: Pick<Session, "capacity" | "taken" | "displayFloor">[]) {
  const totals = sessions
    .map(sessionOccupancy)
    .reduce((acc, o) => ({ capacity: acc.capacity + o.capacity, displayed: acc.displayed + o.displayed }), { capacity: 0, displayed: 0 });
  return {
    ...totals,
    remaining: totals.capacity - totals.displayed,
    percent: totals.capacity ? Math.round((totals.displayed / totals.capacity) * 100) : 0,
  };
}
