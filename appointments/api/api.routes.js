const express = require('express');
const appointmentsRoutes = require('./appointments/appointments.route');
const providersRoutes = require('./providers/providers.route');

const router = express.Router();

router.use('/appointments', appointmentsRoutes);
router.use('/provider', providersRoutes);

module.exports = router;
