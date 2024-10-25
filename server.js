const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public')); // Serve static files from the 'public' directory

const SP_PRIVATE_KEY = "YOUR_PRIVATE_KEY"; // Replace with your private key

app.post('/process-payment', async (req, res) => {
    const paymentData = req.body;

    try {
        const response = await axios.post('https://api.spaceremit.com/payments', paymentData, {
            headers: {
                'Authorization': `Bearer ${SP_PRIVATE_KEY}`
            }
        });

        if (response.data.success) {
            res.status(200).send({ message: 'Payment successful!' });
        } else {
            res.status(400).send({ message: 'Payment failed!', error: response.data });
        }
    } catch (error) {
        console.error('Error processing payment:', error.message);
        res.status(500).send({ message: 'Server error', error: error.message });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
