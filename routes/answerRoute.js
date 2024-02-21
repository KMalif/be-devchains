const express = require("express");
const router = express.Router();
const { addAnswer } = require("../controllers/answerController");
const uploadMedia = require("../middleware/uploadMedia");

router.post("/add", uploadMedia.fields([{ name: 'image', maxCount: 1 }]), addAnswer);

module.exports = router;