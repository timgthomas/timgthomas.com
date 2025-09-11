export function formatDate(date: Date): string {
  // `en-GB` uses `D MMMM YYYY`
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    timeZone: 'UTC',
    year: 'numeric',
  }).format(date)
}
