const express = require("express");
const router = express.Router();
const { addTags, getTagByName, getAllTags, getPopularTags } = require("../controllers/tagController");

router.post('/add', addTags);
router.post('/', getTagByName);
router.get("/", getAllTags);
router.get("/popular", getPopularTags);

module.exports = router;