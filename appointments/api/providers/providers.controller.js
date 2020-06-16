const service = require("../../services/providers.service");

exports.addProviderHandler = async (req, res, next) => {
  const {
    body: { payload }
  } = req;

  try {
    await service.upsert(payload);
    res.sendStatus(200);
  } catch (error) {
    return next(error);
  }
};

exports.deleteProviderHandler = async (req, res, next) => {
  const {
    body: {
      payload: { name }
    }
  } = req;

  try {
    await service.deleteProvider(name);
    res.sendStatus(200);
  } catch (error) {
    return next(error);
  }
};
