const asyncHandler = require("express-async-handler");
const Chat = require("../Models/chatModel");
const User = require("../Models/userModel");

const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }

  if (userId === String(req.user._id)) {
    res.status(400).json({ success: false, msg: 'You can not send messages to yourself' });
    return;
  }

  let chat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  console.log("chat" + chat);

  chat = await User.populate(chat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });

  if (chat.length > 0) {
    res.send(chat[0]);
  } else {
    const chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);
      console.log("createdChat" + createdChat)
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      console.log("Full chat" + FullChat)
      res.status(200).json(FullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
});

const fetchChats = asyncHandler(async (req, res) => {
  try {
    const { user } = req;
    Chat.find({
      users: { $elemMatch: { $eq: user._id } } 
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updateAt: -1 })
      .then( async (result) => {
          const chats = await User.populate(result, {
          path: "latestMessage.sender",
          select: "name pic email",
        });
        res.status(200).json({ success: true, data: chats });
      });
  } catch(e) {
    console.log(e)
    res.status(400).json({ success: false, msg: "Bad request" })
  }
});

const createGroupChat = asyncHandler(async (req, res) => {
  const {users, name} = req.body;

  if (!name) {
    return res.status(400).json({ success: false, message: "Please Fill all the fields" });
  }
  let allUsers = users ? JSON.parse(users) : [];
  allUsers.push(req.user);
  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: allUsers,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
    
    res.status(200).json({ success: true, data: fullGroupChat });
  } catch(e) {
    console.log(e.message)
    res.status(500).json({ success: true, msg: "Server error" })
  }
});
const renameGroup = asyncHandler(async (req, res) => {
  const { chatId, chatName } = req.body;
  
  if (!chatId || !chatName) {
    return res.status(400).json({ success: false, msg: "please provide all props" })
  }

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      chatName: chatName,
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");
    console.log(updatedChat)
  if (!updatedChat) {
    return res.status(404).json({ success: false, msg: "Chat Not Found" })
  } else {
   return res.status(201).json({ success: true, data: updatedChat });
  }
});
const addToGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  if (!chatId || !userId) {
    return res.status(400).json({ success: false, msg: "please provide all props" })
  }
  const chat = await Chat.findById(chatId);

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      $addToSet: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updatedChat) {
    res.status(404).json({ success: false, data: "Chat Not Found" });
  } else {
    res.json({ success: true ,data: updatedChat });
  }
});

const removeFromGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  if (!chatId || !userId) {
    return res.status(400).json({ success: false, msg: "please provide all props" })
  }

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    }, 
    { 
      new: true
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password")
  if (!updatedChat) {
    res.status(404).json({ success: false, msg: "404 not found" })
  } else {
    res.status(200).json({ success: true, data: updatedChat })
  }
})

module.exports = {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup
};
