import dotenv from "dotenv";
dotenv.config();


import express from "express";
const app = express();
app.use(express.json());


import helmet from "helmet";
app.use(helmet());


import cors from "cors";
app.use(cors({
    credentials: true,
    origin: true
}));


import session from "express-session";
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false, 
    saveUninitialized: true,
    cookie: { secure: false } 
}));


import http from "http";
const server = http.createServer(app);

import { Server } from "socket.io";
const io = new Server(server, {
    cors: {
        origin: "*",
        //origin: ["localhost:3000", "localhost:5174"],
        methods: ["*"] 
    }
});


io.on("connection", (socket) => {
    console.log("Connection made");   
    socket.on("Let's Taco 'Bout It Room", (user) => {
        console.log("User in Let's Taco 'Bout It Room:", user);
        socket.join("Let's Taco 'Bout It Room");
        socket.to("Let's Taco 'Bout It Room").emit("Who joined Let's Taco 'Bout It Room?", user);
    });

    socket.on("Let's Taco 'Bout It Room chatmessages", (messageData) => {
        console.log("Data recieved?: ", messageData);
        io.to("Let's Taco 'Bout It Room").emit("message", messageData)
    });
});


import rateLimit from 'express-rate-limit'
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 300,
    standardHeaders: true, 
    legacyHeaders: false,
});

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10, 
    standardHeaders: true,
    legacyHeaders: false,
});

app.use(apiLimiter);
app.use("/api/auth/login", loginLimiter);


function authChecker(req, res, next) {
    console.log("In authChecker...");
    if (!req.session.username) {
        return res.status(400).send({ message: "You are not authorized to see this page" });
    }
    next();
};

//app.use("/api/auth/...", authChecker);


import authRouter from "./routes/authRouter.js";
app.use(authRouter);

import recipeRouter from "./routes/recipeRouter.js";
app.use(recipeRouter);

import chatRouter from "./routes/chatRouter.js";
app.use(chatRouter);

import userRouter from "./routes/userRouter.js";
app.use(userRouter);



const PORT = process.env.PORT || 8080;
server.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    }
    console.log("Server is running on PORT: ", PORT);
});
