// Форматирует дату доставки для отображения
import { addDays } from 'date-fns';

export function formatDeliveryDate(dateString: string): string {
  const date = new Date(dateString);
  const today = new Date();
  const tomorrow = addDays(today, 1);
  const dayAfterTomorrow = addDays(today, 2);

  // Сбрасываем время для сравнения
  const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const tomorrowOnly = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate());
  const dayAfterTomorrowOnly = new Date(
    dayAfterTomorrow.getFullYear(),
    dayAfterTomorrow.getMonth(),
    dayAfterTomorrow.getDate()
  );

  if (dateOnly.getTime() === todayOnly.getTime()) {
    return 'Сегодня';
  } else if (dateOnly.getTime() === tomorrowOnly.getTime()) {
    const hour = date.getHours();
    if (hour < 12) {
      return 'Завтра утром';
    } else {
      return 'Завтра вечером';
    }
  } else if (dateOnly.getTime() === dayAfterTomorrowOnly.getTime()) {
    return 'Послезавтра';
  } else {
    // Форматируем дату в формате "день месяц"
    const day = date.getDate();
    const monthNames = [
      'января',
      'февраля',
      'марта',
      'апреля',
      'мая',
      'июня',
      'июля',
      'августа',
      'сентября',
      'октября',
      'ноября',
      'декабря',
    ];
    const month = monthNames[date.getMonth()];
    return `${day} ${month}`;
  }
}
