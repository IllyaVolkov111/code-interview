const express = require("express");
const { celebrate } = require("celebrate");

const { errorMiddlware } = require("../../helpers/errorHelper");
const {
  appointmentsList,
  postAppointment
} = require("../validators/appointments.validation");
const controller = require("./appointments.controller");

const router = express.Router();

router
  .route("/")
  .get(celebrate(appointmentsList), errorMiddlware, controller.getAppointments);

router
  .route("/")
  .post(
    celebrate(postAppointment),
    errorMiddlware,
    controller.postApprointments
  );

module.exports = router;
