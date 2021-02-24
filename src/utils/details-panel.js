const getTime = function (timeInMinutes) {
  const MINUTES_PER_HOUR = 60;
  const hours = Math.trunc(timeInMinutes / MINUTES_PER_HOUR);
  const time = {
    hours,
    minutes: timeInMinutes - (hours * MINUTES_PER_HOUR),
  };

  return time;
};

export const humanizeDuration = (filmDuration) => {
  const {hours, minutes} = getTime(filmDuration);
  const Time = {
    HOURS: `HOURS`,
    MINUTES: `MINUTES`
  };

  const time = [
    {
      name: Time.HOURS,
      value: hours,
      format: `h`
    },
    {
      name: Time.MINUTES,
      value: minutes,
      format: `m`
    },
  ];

  const durationTimeItems = [];

  for (const item of time) {
    const value = item.value;
    const format = item.format;

    if ((hours && item.name === Time.HOURS || hours && item.name === Time.MINUTES) || !hours && item.name === Time.MINUTES) {
      const formattedElem = `${value}${format}`;

      durationTimeItems.push(formattedElem);
    }
  }

  return durationTimeItems.join(` `);
};
