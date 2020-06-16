import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3500"
});

export const getProviders = params =>
  instance.get(`/appointments`, {
    params
  });

export const postAppointment = params =>
  instance.post(`/appointments`, params);
