//import {API_BASE_URL} from './api'
import moment from "moment";
import { toast } from "react-toastify";

export const successAlert = (text) => {
  return toast.success(text, {
    position: "top-right",
    autoClose: false,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const errorAlert = (text) => {
  return toast.error(text, {
    position: "top-right",
    autoClose: false,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const getYearsList = (length) => {
  const min = new Date().getFullYear();
  const max = min + length;

  const yearArray = () => {
    let arr = [];
    for (let index = min; index < max; index++) {
      arr.push(index);
    }
    return arr;
  };

  return yearArray();
};

export const currentCurrency = () => {
  return "GH¢";
};

export const getYearsPast = (length) => {
  const max = new Date().getFullYear();
  const min = max - length;

  const yearArray = () => {
    let arr = [];
    for (let index = max; index > min; index--) {
      arr.push(index);
    }
    return arr;
  };

  return yearArray();
};

export const getEmailPattern = () =>
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const getID = function () {
  return Math.random().toString(36).substr(2, 9);
};

export const getTrimString = (str, length) => {
  if (str.length > length) {
    console.log(str, length);
    return str.substr(0, length) + "...";
  }
  return str;
};

export const getCapitalize = (string) => {
  if (string) {
    return string.charAt(0).toUpperCase() + string.substring(1);
  } else return null;
};

export const getLowerCase = (string) => {
  if (string) {
    return string.toLowerCase();
  } else return null;
};

export const getIntial = (name) => {
  if (name) {
    return name.slice(0, 1).toUpperCase();
  }
  return null;
};

export const getImgSrc = (src) => {
  return `${src}`;
};

export const timeStamp = (time) => {
  if (moment().format("dddd") === moment(time).format("dddd")) {
    return `Today ${moment(time)?.format("h:mm a")}`;
  } else if (
    moment().subtract(1, "days").format("dddd") === moment(time)?.format("dddd")
  ) {
    return `Yesterday ${moment(time)?.format("h:mm a")}`;
  } else {
    return moment(time)?.format("dddd,  h:mm a");
  }
};

export const combineDateAndTime = function (date, time) {
  console.log(time, "tieme");
  // let d = new Date();
  // time =   d.setTime(time);

  date = new Date(date);
  console.log(date, "date");

  var year = date.getFullYear();
  var month = date.getMonth() + 1; // Jan is 0, dec is 11
  var day = date.getDate();
  var dateString = "" + year + "-" + month + "-" + day;
  var combined = new Date(dateString + " " + time);

  return combined;
};

export const separateDateandTime = (date) => {
  const d = new Date(date);

  var year = d.getFullYear();
  var month = d.getMonth() + 1; // Jan is 0, dec is 11
  var da = d.getDate();
  var hours = d.getHours();
  var minutes = d.getMinutes();
  var day = "" + year + "-" + month + "-" + da;
  var time = "" + hours + ": " + minutes;

  return { day, time };
};

export const sortArray = (arr) => {
  arr.sort(function (x, y) {
    return x.updatedAt - y.updatedAt;
  });
};
