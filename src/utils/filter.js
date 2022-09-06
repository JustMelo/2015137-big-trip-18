import dayjs from 'dayjs';

const getUpcomingRoutes = (routePoints) => {
  const dateNow = dayjs(new Date);
  const upcomingRoutePoints = [];
  routePoints.forEach((element) => {
    if (dateNow.diff(element.dateFrom, 'minute') < 0) {
      upcomingRoutePoints.push(element);
    }
  });

  return upcomingRoutePoints;
};

const getPassedRoutes = (routePoints) => {
  const dateNow = dayjs(new Date);
  const passedRoutePoints = [];
  routePoints.forEach((element) => {
    if (dateNow.diff(element.dateFrom, 'minute') >= 0) {
      passedRoutePoints.push(element);
    }
  });

  return passedRoutePoints;
};

export {getUpcomingRoutes, getPassedRoutes};
