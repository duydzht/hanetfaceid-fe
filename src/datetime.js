require("dayjs/locale/vi");
import dayjs from "dayjs";
var isToday = require("dayjs/plugin/isToday");
var utc = require("dayjs/plugin/utc");
var timezone = require("dayjs/plugin/timezone");
var relativeTime = require("dayjs/plugin/relativeTime");

dayjs.extend(relativeTime);
dayjs.locale("vi");
dayjs.extend(utc);
dayjs.extend(isToday);
dayjs.extend(timezone);

export const formatTimestamp = (time) => {
  if (!time) return "";
  let datetime = time;
  if (`${time}`.length >= 10) {
    datetime = time / 1000;
  }
  return dayjs.unix(datetime).tz("Asia/Ho_Chi_Minh").format("HH:mm:ss");
};

export const formatDate = (date, format = "HH:mm:ss") => {
  if (!date) return "";
  return dayjs(date).format(format);
};

export const dayIsToday = (time) => {
  return dayjs(time).isToday();
};

export const fromNow = (date) => {
  return dayjs(date).fromNow();
};
