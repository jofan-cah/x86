const axios = require('axios');
const Subscription = require('../../models/subscriptionsModel');


const sysSuspend = async (req, res) => {
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
      // Find the subscription in the database
      const subsUpdate = subs.find(sub => sub.subscription_id === data.name);

      if (subsUpdate) {
        // Update the subscription status if it's neither 'INSTALLED' nor 'DISMANTLE'
        if (subsUpdate.subscription_status !== 'INSTALLED' && subsUpdate.subscription_status !== 'DISMANTLE') {
          subsUpdate.subscription_status = data.disabled === 'false' ? 'ACTIVE' : 'SUSPEND';
          await subsUpdate.save();
        }
      }
    }

    res.status(200).json({ message: 'Subscription statuses synchronized successfully' });
  } catch (error) {
    console.error('Error synchronizing subscription statuses:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  sysSuspend
};