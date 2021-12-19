const express = require("express");
const router = express.Router();
const checkToken = require("../middleware/user").checkToken;

const NewsController = require("../controller/news")

router.post("/", checkToken, NewsController.createNews);
router.get("/:archived?", NewsController.getNews);
router.put("/:id", NewsController.archiveNews);
router.delete("/:id", NewsController.deleteNews);

module.exports = router;