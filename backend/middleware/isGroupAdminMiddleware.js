const asyncHandler = require("express-async-handler")
const Chat = require("../Models/chatModel")

const checkRights = asyncHandler(async (req, res, next) => {
  const {chatId} = req.body;
  const chat = await Chat.findById(chatId);
  if (String(chat.groupAdmin) !== String(req.user._id)) {
    
    return next(res.status(403).json({success: false, msg: "only admin of group can do this"}));
  }
  next();
});

module.exports = checkRights;
