import dotenv from "dotenv"; 
dotenv.config();

async function sendSMS(textMessage, phoneNumber) { 
    console.log("send sms function");

    const smsInfo = { 
        user_api_key: process.env.SMS_API_KEY, 
        sms_to_phone: phoneNumber, 
        sms_message: textMessage, 
    }; 
    console.log(smsInfo);
    const form = new URLSearchParams(smsInfo).toString(); 
    await fetch("https://fiotext.com/send-sms", { 
        method: "POST", 
        headers: { 
            "Content-Type": "application/x-www-form-urlencoded" 
        }, 
        body: form 
    }); 
}

export default sendSMS; 