const express = require("express");
const userRoute = require("./userRoute");
const tagRoute = require("./tagRoute");
const questionRoute = require("./questionRoute");
const answerRoute = require("./answerRoute");


const router = express.Router();

router.use("/user", userRoute);
router.use("/tag", tagRoute);
router.use("/question", questionRoute);
router.use("/answer", answerRoute);

module.exports = router;

