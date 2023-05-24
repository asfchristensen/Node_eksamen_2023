"use strict";
import nodemailer from "nodemailer";
import fs from "fs";


export async function sendConfirmationMail(username, email) {
    let testAccount = await nodemailer.createTestAccount();

    const emailContent = fs.readFileSync("email_templates/emailContent.html").toString("utf-8");

    const modifiedEmailContent = emailContent.replace(`<span id="username-placeholder">`, username);


    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, 
        auth: {
            user: testAccount.user, 
            pass: testAccount.pass, 
        },
    });

    try {
        const info = await transporter.sendMail({
            from: "support@myfooduniverse.com", 
            to: username + `<${email}>`, 
            subject: "Welcome to the site", 
            text: `Thanks for joining ${username}`, 
            html: modifiedEmailContent,  
        });
        console.log("Email sent");
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        
    } catch (error) {
        console.log("Error sending email: ", error);
    }
}

