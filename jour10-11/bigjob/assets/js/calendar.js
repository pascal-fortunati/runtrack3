import { isDatePast, monthLabel, weekDays } from "./utils.js";

// Fonction pour construire le calendrier d'un mois donné
export function buildMonth(year, month) {
  const first = new Date(year, month, 1);
  const start = first.getDay() || 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 1; i < start; i++) cells.push({ empty: true });
  for (let d = 1; d <= daysInMonth; d++) {
    const iso = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    cells.push({ iso, past: isDatePast(iso) });
  }
  return cells;
}

export { monthLabel, weekDays };