const asyncHandler = require('express-async-handler');
const User = require('../Models/userModel');
const generateToken = require("../config/generateToken");
const bcrypt = require('bcryptjs')

const registerUser =  async (req, res) => {
  try {
  const { name, email, password, pic } = await req.body;
  // console.log(req.body)
  if (!name || !email || !password) {
    res.status(400).json({ success: false, msg: "Please enter all the  fields" })
    return
  }
  const userExist = await User.findOne({email: email});
  if (userExist) {
    res.status(417).json({ success: false, msg: "This user already exist" });
    return
  }

  const salt = await bcrypt.genSalt(12);
  confirmedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: confirmedPassword,
    pic
  });

  if (user) {
    res.status(201).json({
      success: true,
      msg: "User was successfully created",
      _id: user._id,
      email: user.email,
      name: user.name,
      pic: user.pic,
      token: generateToken(user._id),
    })
  } else {
    res.status(500).json({ success: false, msg: "failed to create new user" })
  }
  } catch(e) {
    res.status(400)
  }
};

const authUser =  async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    console.log("Please fill all the  fields");
    res.status(400).json({ success: false, msg: "Please fill all the  fields" });
    res.end()
    return;
  }
  let user = await User.findOne({ email });
  console.log(user);
  if (!user) {
    // console.log("User not found")
    res.status(404).json({ success: false, msg: "This user does not exist" });
    return;
  } 
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (user && isPasswordMatch) {
    // const isPasswordMatch = await bcrypt.compare(password, user.password);
    res.status(200).json({
      success: true,
      msg: "Successfully logged in",
      _id: user.id,
      email: user.email,
      name: user.name,
      pic: user.pic,
      token: generateToken(user._id),
    });

  } else {
    res.json({ success: false, msg: "Incorrect data"});
  }
};
// /api/user?search=diavk
const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search;
  const searchParam = keyword ? {
    $or: [
      { name: {$regex: keyword, $options: "i" } },
      { email: { $regex: keyword, $options: "i" } },
    ]
  } : {};

  const users = await User.find(searchParam);
  console.log(users);
  console.log(keyword);
  // if (user) {
    res.status(200).json({ success: true ,data: users });
  // } else {
  //   res.status(404).json({ success: false, msg: "404 NOT FOUND" })
  // }
  
  return;
})

module.exports = { registerUser, authUser, allUsers };
