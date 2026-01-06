
export function getLocal24HourTime(isoString) {
  const date = new Date(isoString);

  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${hours}:${minutes}`;
}

export function getMonthYear(isoString) {
  const date = new Date(isoString);

  return date.toLocaleString('en-US', {
    month: 'long',
    year: 'numeric'
  });
}