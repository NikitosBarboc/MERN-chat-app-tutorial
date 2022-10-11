"use strict";
// const chats  = require('./data/data');
const express = require('express');
const {port} = require('./config/default.json');
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes')
const connectDB = require('./config/db')
const colors = require('colors');
const {notFound, errorHandler} = require('./middleware/errorMiddleware')
connectDB();

const app = express();

app.use(express.json())

app.get('/', (req, res) => {
    res.send('API is Running');
});

app.use('/api/user', userRoutes);
app.use("/api/chat", chatRoutes)
app.use(notFound);
app.use(errorHandler);

const PORT = port || 5000;

app.get(
app.listen(PORT, () => {
    console.log(`Server run on ${PORT}....`.blue.bold);
}));
