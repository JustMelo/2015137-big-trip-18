import dayjs from 'dayjs';

export const getRandomNumberInRange = (min, max) => Math.floor(Math.random() * (max - min)) + min;

export const changeDateFormatView = (someDate) => dayjs(someDate).format('YYYY-MM-DDTHH:mm');
export const changeDateToMonthDays = (someDate) => dayjs(someDate).format('MMM DD');
export const changeDateToHoursMinutes = (someDate) => dayjs(someDate).format('HH[:]mm');
export const changeDateToYearsMonthsDays = (someDate) => dayjs(someDate).format('YYYY-MM-DD');
export const changeDateToFormatEditorView = (someDate) => dayjs(someDate).format('YY/MM/DD HH[:]mm');

export const getDateDiff = (startDate, endDate) => {
  const dateFrom = dayjs(startDate);
  const dateTo = dayjs(endDate);
  let diffMinutes = dateTo.diff(dateFrom, 'minute');
  let diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  diffMinutes = diffMinutes - (diffHours * 60);
  diffHours = diffHours - (diffDays * 24);
  return `${diffDays}D ${diffHours}H ${diffMinutes}M`;
};
