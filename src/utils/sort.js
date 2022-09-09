import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

const sortRoutesByDate = (firstElem, secondElem) => {
  const firstPoint = dayjs(firstElem.dateFrom);
  const secondPoint = dayjs(secondElem.dateFrom);
  const diffMinutes = firstPoint.diff(secondPoint, 'minute');
  if (diffMinutes > 0) {
    return 1;
  }
  return -1;
};

const getDurationDates = (pointDate) => {
  const startDate = dayjs(pointDate.dateFrom);
  const endDate = dayjs(pointDate.dateTo);

  return endDate.diff(startDate, 'minute');
};

const sortRoutesByTime = (firstElem, secondElem) => {
  const firstDateDuration = getDurationDates(firstElem);
  const secondDateDuration = getDurationDates(secondElem);

  if (firstDateDuration > secondDateDuration) {
    return -1;
  }
  return 1;
};

const sortRoutesByPrice = (firstElem, secondElem) => secondElem.basePrice - firstElem.basePrice;

export {
  sortRoutesByDate,
  sortRoutesByTime,
  sortRoutesByPrice,
};
