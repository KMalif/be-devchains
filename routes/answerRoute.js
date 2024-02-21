const express = require("express");
const router = express.Router();
const { addAnswer } = require("../controllers/answerController");
const uploadMedia = require("../middleware/uploadMedia");
const { authenticateUser } = require("../middleware/authenticateUser");

router.post("/add", authenticateUser, uploadMedia.fields([{ name: 'image', maxCount: 1 }]), addAnswer);

module.exports = router;