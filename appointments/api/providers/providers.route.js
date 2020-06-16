const express = require("express");

const controller = require("./providers.controller");

const router = express.Router();

router.route("/add").post(controller.addProviderHandler);

router.route("/remove").post(controller.deleteProviderHandler);

module.exports = router;
