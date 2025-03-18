import axios from "axios";

export const instance = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
