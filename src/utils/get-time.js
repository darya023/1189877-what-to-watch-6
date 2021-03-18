const MINUTES_PER_HOUR = 60;
const SECONDS_PER_MINUTE = 60;

export const getTime = function (timeInMinutes, countSeconds) {
  const hours = Math.trunc(timeInMinutes / MINUTES_PER_HOUR);
  const minutes = Math.trunc(timeInMinutes) - (hours * MINUTES_PER_HOUR);
  const time = {
    hours,
    minutes,
    seconds: countSeconds
      ? Math.trunc((timeInMinutes - Math.trunc(timeInMinutes)) * SECONDS_PER_MINUTE)
      : null,
  };

  return time;
};
