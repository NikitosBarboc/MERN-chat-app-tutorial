const express = require("express");
const protect = require("../middleware/authMiddleware");
const chat = require('../controllers/chatControllers');
const router = express.Router();
// // const { renameGroup, accessChat } = require("../controllers/chatControllers")
// router.route('/').post(protect, accessChat);
// router.route('/').get(protect, fetchChats);
// router.route('/group').post(protect, createGroupChat);

console.log(chat);
module.exports = router;
