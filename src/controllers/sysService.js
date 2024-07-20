const axios = require('axios');
const Subscription = require('../../models/subscriptionsModel');
const agent = require('../../helpers/http');

// Function to update subscription profiles
const sysService = async (req, res) => {
  try {
    // Fetch data from Mikrotik
    const { data: dataMikrotik } = await axios.get(`${process.env.ROUTER_API_URL}/rest/user-manager/user-profile`, {
      auth: {
        username: process.env.ROUTER_API_USERNAME,
        password: process.env.ROUTER_API_PASSWORD
      },
      httpsAgent: agent,
    });

    // Fetch all subscriptions
    const subs = await Subscription.findAll();

    for (const data of dataMikrotik) {
      const subscription = subs.find(sub => sub.subscription_id === data.user);

      if (subscription) {
        const speed = data.profile.split('MBPS')[0];

        if (speed !== subscription.service.service_speed) {
          try {
            // Get user profile ID
            const { data: userProfileData } = await axios.get(`${process.env.ROUTER_API_URL}/rest/user-manager/user-profile?user=${data.user}`, {
              auth: {
                username: process.env.ROUTER_API_USERNAME,
                password: process.env.ROUTER_API_PASSWORD
              },
              httpsAgent: agent,
            });

            const userProfileId = userProfileData[0]['.id'];

            // Delete existing user profile
            await axios.delete(`${process.env.ROUTER_API_URL}/rest/user-manager/user-profile/${userProfileId}`, {
              auth: {
                username: process.env.ROUTER_API_USERNAME,
                password: process.env.ROUTER_API_PASSWORD
              },
              httpsAgent: agent,
            });

            // Create new user profile
            const response = await axios.put(`${process.env.ROUTER_API_URL}/rest/user-manager/user-profile`, {
              user: data.user,
              profile: `${subscription.service.service_speed}MBPS`
            }, {
              auth: {
                username: process.env.ROUTER_API_USERNAME,
                password: process.env.ROUTER_API_PASSWORD
              },
              httpsAgent: agent,
            });

            if (response.status === 200) {
              console.log(`Update Subs ${subscription.subscription_id} (${subscription.customer.customer_name}) ${subscription.billing_status} Success`);
            } else {
              console.error(`Update Subs ${subscription.subscription_id} (${subscription.customer.customer_name}) Failed`);
            }
          } catch (error) {
            console.error('Error updating user profile:', error.message);
          }
        }
      }
    }

    res.status(200).json({ message: 'Subscription profiles updated successfully' });
  } catch (error) {
    console.error('Error fetching data from Mikrotik:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

module.exports = {
  sysService
};
