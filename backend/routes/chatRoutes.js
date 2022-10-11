const express = require("express");
const protect = require("../middleware/authMiddleware");
const checkRights = require("../middleware/isGroupAdminMiddleware")
const { renameGroup,
  accessChat,
  fetchChats,
  createGroupChat,
  addToGroup,
  removeFromGroup
} = require('../controllers/chatControllers');
const router = express.Router();

router.route('/').post(protect, accessChat);
router.route('/').get(protect, fetchChats);
router.route('/group').post(protect, createGroupChat);
router.route('/rename').put(protect, checkRights, renameGroup);
router.route('/groupremove').put(protect, checkRights, removeFromGroup);
router.route('/groupadd').put(protect, checkRights, addToGroup);

module.exports = router;
