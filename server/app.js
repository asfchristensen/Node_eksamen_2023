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
app.use("/api/auth/login", loginLimiter);


function authChecker(req, res, next) {
    console.log("In authChecker...");
    if (!req.session.object.username) {
        return res.status(400).send({ message: "You are not authorized to see this page" });
    }
    next();
};

//app.use("/api/auth/...", authChecker);


import authRouter from "./routes/authRouter.js";
app.use(authRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    }
    console.log("Server is running on PORT: ", PORT);
});