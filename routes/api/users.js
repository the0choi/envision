const express = require("express");
const router = express.Router();
const usersCtrl = require("../../controllers/api/users");
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// All paths start with '/api/users'

router.get('/check-token', ensureLoggedIn, usersCtrl.checkToken);
router.get('/check-user/:id', ensureLoggedIn, usersCtrl.checkUser);
router.post("/", usersCtrl.create);
router.post("/login", usersCtrl.login);

module.exports = router;
