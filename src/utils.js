import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export const getRandomNumberInRange = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

export const changeFormatToFullDateTime = (someDate) => dayjs(someDate).format('YYYY-MM-DDTHH:mm');
export const changeDateToMonthDays = (someDate) => dayjs(someDate).format('MMM DD');
export const changeDateToHoursMinutes = (someDate) => dayjs(someDate).format('HH[:]mm');
export const changeDateToYearsMonthsDays = (someDate) => dayjs(someDate).format('YYYY-MM-DD');
export const changeFormatToDateTime = (someDate) => dayjs(someDate).format('YY/MM/DD HH[:]mm');

export const getDurationFromDates = (startDate, endDate) => {
  const dateFrom = dayjs(startDate);
  const dateTo = dayjs(endDate);
  const diffMinutes = dateTo.diff(dateFrom, 'minute');

  if (dateTo.diff(dateFrom, 'days') >= 1) {
    return dayjs.duration(diffMinutes, 'minute').format('DD[D] HH[H] mm[M]');
  }

  if (dateTo.diff(dateFrom, 'hours') > 1) {
    return dayjs.duration(diffMinutes, 'minute').format('HH[H] mm[M]');
  }

  return dayjs.duration(diffMinutes, 'minute').format('mm[M]');
};

export const isEscapeKey = (evt) => evt.key === 'Escape' || evt.key === 'Esc';
