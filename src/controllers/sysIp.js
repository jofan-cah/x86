const axios = require('axios');
const Subscription = require('../../models/subscriptionsModel');
const agent = require('../../helpers/http');


// Function to sync IP addresses
const syncIp = async (req, res) => {
  try {
    // Fetch data from Mikrotik
    const { data: dataMikrotik } = await axios.get(`${process.env.ROUTER_API_URL}/rest/user-manager/user`, {
      auth: {
        username: process.env.ROUTER_API_USERNAME,
        password: process.env.ROUTER_API_PASSWORD
      },
      httpsAgent: agent
    });

    // Fetch all subscriptions
    const subs = await Subscription.findAll();

    // Iterate over the Mikrotik data
    for (const data of dataMikrotik) {
      // Check if the subscription exists
      const subscription = subs.find(sub => sub.subscription_id === data.name);

      if (subscription) {
        const ipAddress = data.attributes.split(':')[1].trim();

        // Update the subscription with the new IP address
        subscription.ip_address = ipAddress;
        await subscription.save();
      }
    }

    res.status(200).json({ message: 'IP addresses synced successfully' });
  } catch (error) {
    console.error('Error syncing IP addresses:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  syncIp
};