// Slot helpers. Slots are Solana's clock primitive; ~400ms target.
export const SLOT_MS = 400;

export function slotsFromMillis(ms: number): number {
  return Math.ceil(ms / SLOT_MS);
}

export function millisFromSlots(slots: number): number {
  return slots * SLOT_MS;
}

export function slotsPerDay(): number {
  return Math.floor((24 * 60 * 60 * 1000) / SLOT_MS);
}

export function formatSlotDelta(slots: number): string {
  const sec = (slots * SLOT_MS) / 1000;
  if (sec < 60) return `${sec.toFixed(1)}s`;
  if (sec < 3600) return `${(sec / 60).toFixed(1)}m`;
  return `${(sec / 3600).toFixed(2)}h`;
}
