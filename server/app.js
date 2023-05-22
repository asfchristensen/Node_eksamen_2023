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

import recipeRouter from "./routes/recipeRouter.js"
app.use(recipeRouter);

import userRouter from "./routes/userRouter.js";
app.use(userRouter);

import publishedRecipesRouter from "./routes/publishedRecipesRouter.js";
app.use(publishedRecipesRouter);

import eventRouter from "./routes/eventRouter.js";
app.use(eventRouter);


import forgotPasswordRouter from "./routes/forgotPasswordRouter.js";
app.use(forgotPasswordRouter);



const PORT = process.env.PORT || 8080;
app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    }
    console.log("Server is running on PORT: ", PORT);
});