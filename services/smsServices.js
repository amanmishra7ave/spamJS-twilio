const axios = require('axios');
require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID; // Your Twilio Account SID
const authToken = process.env.TWILIO_AUTH_TOKEN;   // Your Twilio Auth Token
const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID; // Messaging Service SID

async function sendSms(to, message) {
    const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;

    try {
        const response = await axios.post(
            url,
            new URLSearchParams({
                To: to,
                MessagingServiceSid: messagingServiceSid,
                Body: message,
            }),
            {
                auth: {
                    username: accountSid,
                    password: authToken,
                },
            }
        );

        console.log(`SMS sent successfully: ${response.data.sid}`);
        return response.data;
    } catch (error) {
        console.error(`Failed to send SMS: ${error.response.data.message}`);
        throw error;
    }
}

module.exports = { sendSms };
