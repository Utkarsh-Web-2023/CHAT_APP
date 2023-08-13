const express = require('express');
const app = express();
const serverless = require('serverless-http')
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const path = require('path');  // Add path module
const router = express.Router()
// const server = http.createServer(app);  // Create server using http module
// const io = socketIO(server);

const PORT = process.env.PORT || 8000;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));  // Use path.join for correct file path
});

app.use(express.static(path.join(__dirname, '../dist')));  // Use path.join for correct static content path

const systemGreeting = {
    user: 'Jarvis',
    message: 'Welcome to Utkarsh Chat APP'
};

io.on('connection', (socket) => {
    socket.emit('message', systemGreeting);  // Send a welcome message to the connecting client
    console.log('Connected...');

    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg);  // Broadcast the received message to all clients
    });

    socket.on('joined', (name) => {
        const systemMessage = {
            user: 'Jarvis',
            message: `${name} has joined the chat.`
        };
        
        io.emit('message', systemMessage);  // Broadcast the join message to all clients
    });
})
app.use('/.netlify/functions/index', router)
module.exports.handler = serverless(app);
http.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
  })
  // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
const firebase = require('firebase/app');
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1a3IRwzMlVJiU_qznTesBqFk6p0t4Kfs",
  authDomain: "chat-app-utkarsh.firebaseapp.com",
  projectId: "chat-app-utkarsh",
  storageBucket: "chat-app-utkarsh.appspot.com",
  messagingSenderId: "37737525277",
  appId: "1:37737525277:web:94fde5a27b2f6c62a796f4",
  measurementId: "G-XRBVT6S1QJ"
};

// // Initialize Firebase
firebase.initializeApp(firebaseConfig);

