import { Router } from "express";
const router = Router();

import { sendWeeklyFoodPlan } from "../util/nodemailer.js";  

router.post("/api/user/weekly-plan", (req, res) => {
    const weeklyFoodPlan = req.body;
    const userEmail = req.session.user.email;

    if (!weeklyFoodPlan) {
        res.status(400).send({ message: "error - no weekly foodplan recieved", status: 400 });
    } else {
        sendWeeklyFoodPlan(userEmail, weeklyFoodPlan);
        res.status(200).send({ message: "success - weekly foodplan sent", status: 200 });
    }
});

export default router;