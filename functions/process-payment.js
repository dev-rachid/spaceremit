const axios = require('axios');

exports.handler = async function(event, context) {
    const paymentData = JSON.parse(event.body);

    const SP_PRIVATE_KEY = "YOUR_PRIVATE_KEY"; // Replace with your private key

    try {
        const response = await axios.post('https://api.spaceremit.com/payments', paymentData, {
            headers: {
                'Authorization': `Bearer ${SP_PRIVATE_KEY}`
            }
        });

        if (response.data.success) {
            return {
                statusCode: 200,
                body: JSON.stringify({ message: 'Payment successful!' })
            };
        } else {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Payment failed!', error: response.data })
            };
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Server error', error: error.message })
        };
    }
};
