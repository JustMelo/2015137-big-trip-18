import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

const getUpcomingRoutes = (routePoints) => {
  const dateNow = dayjs(new Date);
  const filteredRoutePoints = [];

  routePoints.forEach((element) => {
    const startDate = dayjs(element.dateFrom);
    const endDate = dayjs(element.dateTo);

    if (dateNow.isBetween(startDate, endDate, 'minute') || startDate.isAfter(dateNow, 'minute')) {
      filteredRoutePoints.push(element);
    }

  });
  return filteredRoutePoints;
};

const getPassedRoutes = (routePoints) => {
  const dateNow = dayjs(new Date);
  const filteredRoutePoints = [];

  routePoints.forEach((element) => {
    const startDate = dayjs(element.dateFrom);
    const endDate = dayjs(element.dateTo);

    if (dateNow.isBetween(startDate, endDate, 'minute') || startDate.isBefore(dateNow, 'minute')) {
      filteredRoutePoints.push(element);
    }

  });
  return filteredRoutePoints;
};

export {
  getUpcomingRoutes,
  getPassedRoutes
};
