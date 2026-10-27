/**
 * Sessions de l'édition. Mettez à jour `taken` à chaque réservation confirmée :
 * le compteur du site se met à jour automatiquement.
 */
export type SessionId = "s1" | "s2" | "s3";

export type Session = {
  id: SessionId;
  label: string;
  start: string; // ISO yyyy-mm-dd
  end: string;
  capacity: number;
  taken: number;
};

export const editionYear = 2027;

export const sessions: Session[] = [
  { id: "s1", label: "Session 1", start: "2027-03-14", end: "2027-03-21", capacity: 20, taken: 0 },
  { id: "s2", label: "Session 2", start: "2027-03-21", end: "2027-03-28", capacity: 20, taken: 0 },
  { id: "s3", label: "Session 3", start: "2027-03-28", end: "2027-04-04", capacity: 20, taken: 0 },
];

export const totalCapacity = sessions.reduce((n, s) => n + s.capacity, 0);
export const totalTaken = sessions.reduce((n, s) => n + s.taken, 0);
