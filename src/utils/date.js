import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

const changeFormatToFullDateTime = (someDate) => dayjs(someDate).format('YYYY-MM-DDTHH:mm');
const changeDateToMonthDays = (someDate) => dayjs(someDate).format('MMM DD');
const changeDateToHoursMinutes = (someDate) => dayjs(someDate).format('HH[:]mm');
const changeDateToYearsMonthsDays = (someDate) => dayjs(someDate).format('YYYY-MM-DD');
const changeFormatToDateTime = (someDate) => dayjs(someDate).format('YY/MM/DD HH[:]mm');

const getDurationFromDates = (startDate, endDate) => {
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

export {
  changeDateToHoursMinutes,
  changeDateToMonthDays,
  changeDateToYearsMonthsDays,
  changeFormatToDateTime,
  changeFormatToFullDateTime,
  getDurationFromDates
};
