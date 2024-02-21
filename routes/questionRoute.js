const express = require("express");
const router = express.Router();
const { addQuestion, getAllQuestion, getUserQuestion, getDetailQuestion } = require("../controllers/questionController");
const uploadMedia = require("../middleware/uploadMedia");
const { authenticateUser } = require("../middleware/authenticateUser");

router.post("/add", authenticateUser, uploadMedia.fields([{ name: 'image', maxCount: 1 }]), addQuestion);
router.get("/all", authenticateUser, getAllQuestion);
router.get("/user", authenticateUser, getUserQuestion);
router.get("/:id", getDetailQuestion);

module.exports = router;