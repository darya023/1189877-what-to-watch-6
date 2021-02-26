import dayjs from "dayjs";

export const humanizeDate = (date, format) => {
  return dayjs(date).format(format);
};
