const express = require("express");
const router = express.Router();

const NewsController = require("../controller/news")

router.post("/", NewsController.createNews);
router.get("/:archived?", NewsController.getNews);
router.put("/:id", NewsController.archiveNews);
router.delete("/:id", NewsController.deleteNews);

module.exports = router;