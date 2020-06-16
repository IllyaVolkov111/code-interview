const REST_PORT = process.env.REST_PORT || 3500;
const PUBSUB_PORT = process.env.PUBSUB_PORT || 3535;

const PUBSUB_URL = `http://localhost:${PUBSUB_PORT}`;
const PROVIDER_URL = `http://localhost:${REST_PORT}/provider`;

const CHANELS = {
  NEW_APPOINTMENTS: "newAppointments",
  ADD_PROVIDER: "addProvider",
  DELETE_PROVIDER: "deleteProvider"
};

module.exports = { PUBSUB_URL, PROVIDER_URL, CHANELS };
