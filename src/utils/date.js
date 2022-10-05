import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

const changeFormatToFullDateTime = (date) => dayjs(date).format('YYYY-MM-DDTHH:mm');
const changeDateToMonthDays = (date) => dayjs(date).format('MMM DD');
const changeDateToHoursMinutes = (date) => dayjs(date).format('HH[:]mm');
const changeDateToYearsMonthsDays = (date) => dayjs(date).format('YYYY-MM-DD');
const changeFormatToDateTime = (date) => dayjs(date).format('DD/MM/YY HH[:]mm');
const changeFormatToUtc = (data) => dayjs(data).format('YYYY-MM-DDTHH:MM:ss[.]SSS[Z]');

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
  changeFormatToUtc,
  getDurationFromDates
};
