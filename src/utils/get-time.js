export const getTime = function (timeInMinutes) {
  const MINUTES_PER_HOUR = 60;
  const hours = Math.trunc(timeInMinutes / MINUTES_PER_HOUR);
  const time = {
    hours,
    minutes: timeInMinutes - (hours * MINUTES_PER_HOUR),
  };

  return time;
};
