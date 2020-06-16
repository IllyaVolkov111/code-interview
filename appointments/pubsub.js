const request = require("request-promise");
const config = require("./config");

exports.publishMessage = ({ name, date }) => {
  request({
    method: "POST",
    uri: `${config.PUBSUB_URL}/publish`,
    json: true,
    body: {
      payload: {
        name: name,
        date: date
      },
      channel: config.CHANELS.NEW_APPOINTMENTS
    }
  });
};

exports.initAddSubscription = () => {
  request({
    method: "POST",
    uri: `${config.PUBSUB_URL}/subscribe`,
    json: true,
    body: {
      address: `${config.PROVIDER_URL}/add`,
      channel: config.CHANELS.ADD_PROVIDER
    }
  });
};

exports.initDeleteSubscription = () => {
  request({
    method: "POST",
    uri: `${config.PUBSUB_URL}/subscribe`,
    json: true,
    body: {
      address: `${config.PROVIDER_URL}/remove`,
      channel: config.CHANELS.DELETE_PROVIDER
    }
  });
};
