import dotenv from "dotenv"; 
dotenv.config();

async function sendSMS(textMessage, phoneNumber) { 
    const smsInfo = { 
        user_api_key: process.env.SMS_API_KEY, 
        sms_to_phone: phoneNumber, 
        sms_message: textMessage, 
    }; 
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