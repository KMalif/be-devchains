const express = require("express");
const router = express.Router();
const { addTags, getTagByName, getAllTags } = require("../controllers/tagController");

router.post('/add', addTags);
router.post('/', getTagByName);
router.get("/", getAllTags);

module.exports = router;