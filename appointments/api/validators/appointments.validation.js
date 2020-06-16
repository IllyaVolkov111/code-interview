const { Joi } = require("celebrate");

module.exports = {
  appointmentsList: {
    query: {
      specialty: Joi.string().min(1),
      date: Joi.number(),
      minScore: Joi.number()
    }
  },

  postAppointment: {
    body: {
      name: Joi.string().min(1),
      date: Joi.number()
    }
  }
};
