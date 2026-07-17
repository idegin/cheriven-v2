const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export function formatDate(input: string) {
  const d = new Date(input);
  return {
    day: String(d.getUTCDate()).padStart(2, "0"),
    month: MONTHS[d.getUTCMonth()],
    year: d.getUTCFullYear(),
    full: `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`,
    iso: d.toISOString().slice(0, 10),
  };
}
