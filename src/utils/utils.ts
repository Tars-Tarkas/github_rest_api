/**
 * Функция конветации даты
 * @param dateString принимает строку
 * @returns вовзращает значение в формате даты
 */
export function formatDate(dateString: string) {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "numeric",
    year: "numeric",
  };
  return date.toLocaleDateString("RU", options);
}
