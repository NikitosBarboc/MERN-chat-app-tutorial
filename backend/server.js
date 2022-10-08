"use strict";
const chats  = require('./data/data');
const express = require('express');
const path = require('path')
require('dotenv').config({path:'./.env'})
const connectDB = require('./config/db')
const colors = require('colors');

connectDB()

const app = express();


app.get('/', (req, res) => {
    res.send('API is Running');
});

app.get('/api/chat', (req, res) => {
    res.json({res: chats})
})

app.get('/api/chat/:id', (req, res) => {
    const { id } = req.params;
    const searchingChat = chats.find(chat => chat._id === id) 
    res.send(searchingChat)
})

const PORT = process.env.PORT || 5000;

app.get(
app.listen(PORT, () => {
    console.log(`Server run on ${PORT}....`.blue.bold);
}));
