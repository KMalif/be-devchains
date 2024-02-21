const express = require("express");
const router = express.Router();
const { addTags, getTagByName } = require("../controllers/tagController");

router.post('/add', addTags);
router.post('/', getTagByName);

module.exports = router;