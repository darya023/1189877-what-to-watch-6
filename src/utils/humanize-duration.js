import {DurationView} from "../const";
import {getTime} from "./get-time";

const Time = {
  HOURS: `HOURS`,
  MINUTES: `MINUTES`,
  SECONDS: `SECONDS`,
};

export const humanizeDuration = (durationInMunites, durationView) => {
  const {hours, minutes, seconds} = getTime(durationInMunites, durationView === DurationView.COLON);
  let joinSymbol = ``;
  let time = [];
  const durationTimeItems = [];

  switch (durationView) {
    case DurationView.LETTERS:
      joinSymbol = ` `;
      time = [
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

      break;

    case DurationView.COLON:
      time = [
        {
          name: Time.HOURS,
          value: hours,
          format: `:`
        },
        {
          name: Time.MINUTES,
          value: minutes,
          format: `:`
        },
        {
          name: Time.SECONDS,
          value: seconds,
          format: ``
        },
      ];

      break;

    default:
      break;
  }

  for (const item of time) {
    const value = item.value;
    const format = item.format;
    const zero = hours && item.name === Time.MINUTES || item.name === Time.SECONDS
      ? `0`
      : ``;
    const elem = `${zero}${value}`;

    if (hours && item.name === Time.HOURS || item.name === Time.MINUTES || item.name === Time.SECONDS) {
      const formattedElem = !(durationView === DurationView.LETTERS && !hours && !minutes)
        ? `${elem.slice(-2)}${format}`
        : ``;

      durationTimeItems.push(formattedElem);
    }
  }

  return durationTimeItems.join(joinSymbol);
};
