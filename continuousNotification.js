const { sendSms } = require('./services/smsServices');

// Updated users array with names and phone numbers
const users = [
    { id: 1, email: 'elon', phone: '+919999999999' },

];

const messages = ['works'];

async function sendNotificationsContinuously() {
    let counter = 0;

    setInterval(async () => {
        const user = users[counter % users.length]; 
        const message = messages[counter % messages.length]; 

        try {
            await sendSms(user.phone, message);

            console.log(`Notification sent to ${user.phone} -> Message: "${message}"`);
        } catch (error) {
            console.error(`Failed to send notification: ${error.message}`);
        }

        counter++;
    }, 1000); 
}

sendNotificationsContinuously();
