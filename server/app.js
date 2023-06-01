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
        origin: "http://localhost:5173",
        methods: ["*"] 
    }
});

const chatUsers = {};

io.on("connection", (socket) => {

    socket.on("User joins room", (user) => {
        for (const socketIDKey in chatUsers) {    
            const userInList = chatUsers[socketIDKey];
            if (userInList.data.email === user.data.email) {
                    delete chatUsers[socketIDKey];
            }   
        }

        chatUsers[socket.id] = user;
        socket.join("Let's Taco 'Bout It Room");
        io.to("Let's Taco 'Bout It Room").emit("User joined Room", user); 
        io.to("Let's Taco 'Bout It Room").emit("chatUsers", chatUsers); 
    });

    socket.on("Let's Taco 'Bout It Room chatmessages", (messageData) => {
        io.to("Let's Taco 'Bout It Room").emit("message", messageData);
    });

    socket.on("leave room", (user) => {
        socket.leave("Let's Taco 'Bout It Room");
        socket.to("Let's Taco 'Bout It Room").emit("User left the room", user);
        delete chatUsers[socket.id];
        io.to("Let's Taco 'Bout It Room").emit("chatUsers", chatUsers);
    });
});


import rateLimit from 'express-rate-limit'
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
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
app.use("/api/all/auth/login", loginLimiter);


function bothChecker(req, res, next) {
    if (!req.session.user) {
        return res.status(400).send({ message: "You are not authorized to see this page" });
    }
    next();
}

function userChecker(req, res, next) {
    if (!req.session.user || req.session.user.role !== 2) {
        return res.status(400).send({ message: "You are not authorized to see this page" });
    }
    next();
}

function adminChecker(req, res, next) {
    if (!req.session.user || req.session.user.role !== 1) {
        return res.status(400).send({ message: "You are not authorized to see this page" });
    }
    next();
}

app.use("/api/both", bothChecker);
app.use("/api/user", userChecker);
app.use("/api/admin", adminChecker);


import authRouter from "./routes/auth/authRouter.js";
app.use(authRouter);

import forgotPasswordRouter from "./routes/auth/forgotPasswordRouter.js";
app.use(forgotPasswordRouter);

import signupRouter from "./routes/auth/signupRouter.js";
app.use(signupRouter);

import recipeRouter from "./routes/recipeRouter.js";
app.use(recipeRouter);

import chatRouter from "./routes/chatRouter.js";
app.use(chatRouter);

import userRouter from "./routes/userRouter.js";
app.use(userRouter);

import publicRecipesRouter from "./routes/publicRecipesRouter.js";
app.use(publicRecipesRouter);

import eventRouter from "./routes/eventRouter.js";
app.use(eventRouter);

import ratingRouter from "./routes/ratingRouter.js";
app.use(ratingRouter);

import feedbackRouter from "./routes/feedbackRouter.js";
app.use(feedbackRouter);

import weeklyPlanRouter from "./routes/weeklyPlanRouter.js";
app.use(weeklyPlanRouter);


const PORT = process.env.PORT || 8080;
server.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    }
    console.log("Server is running on PORT: ", PORT);
});
