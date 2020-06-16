const { publishMessage } = require("../../pubsub");

const service = require("../../services/appointments.service");

exports.getAppointments = async (req, res, next) => {
  const { query } = req;

  try {
    let providers = await service.getApprointments(query);
    res.send(providers);
  } catch (error) {
    return next(error);
  }
};

exports.postApprointments = async (req, res) => {
  const { body } = req;

  try {
    await service.postApprointments(body);
    await publishMessage(body);

    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(400);
  }
};
