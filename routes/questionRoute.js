const express = require("express");
const router = express.Router();
const { addQuestion, getAllQuestion, getUserQuestion } = require("../controllers/questionController");
const uploadMedia = require("../middleware/uploadMedia");

router.post("/add", uploadMedia.fields([{ name: 'image', maxCount: 1 }]), addQuestion);
router.get("/", getAllQuestion);
router.get("/user", getUserQuestion);

module.exports = router;