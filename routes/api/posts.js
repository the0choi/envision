const express = require("express");
const router = express.Router();
const postsCtrl = require("../../controllers/api/posts");
const ensureLoggedIn = require('../../config/ensureLoggedIn');

router.post("/generateImage", ensureLoggedIn, postsCtrl.generateImage);
router.post("/create", ensureLoggedIn, postsCtrl.create);
router.delete("/delete/:id", ensureLoggedIn, postsCtrl.deletePost);
router.get("/", ensureLoggedIn, postsCtrl.index);
router.get("/user", ensureLoggedIn, postsCtrl.userIndex);
router.get("/:id", ensureLoggedIn, postsCtrl.show);

module.exports = router;
