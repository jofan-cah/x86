const axios = require('axios');
const createError = require('http-errors');


const createUserAndProfile = async (req, res, next) => {
  const { name, password, ipAddress, speed } = req.body;

  try {
    // Cek apakah pengguna sudah ada
    const checkAvaliableRadiusUser = await axios.get(`${process.env.ROUTER_API_URL}/rest/user-manager/user?name=${name}`, {
      auth: {
        username: process.env.ROUTER_API_USERNAME,
        password: process.env.ROUTER_API_PASSWORD
      },
      httpsAgent: {
        rejectUnauthorized: false
      }
    });

    if (checkAvaliableRadiusUser.data.length !== 0) {
      console.info(`User ${name} already created`);
      return res.status(200).json({ message: `User ${name} already created` });
    }

    // Buat pengguna baru
    await axios.put(`${process.env.ROUTER_API_URL}/rest/user-manager/user`, {
      name,
      password,
      attributes: `Framed-IP-Address:${ipAddress}`,
      "shared-users": "1",
      group: "default"
    }, {
      auth: {
        username: process.env.ROUTER_API_USERNAME,
        password: process.env.ROUTER_API_PASSWORD
      },
      httpsAgent: {
        rejectUnauthorized: false
      }
    });

    // Buat profil pengguna baru
    const response = await axios.put(`${process.env.ROUTER_API_URL}/rest/user-manager/user-profile`, {
      user: name,
      profile: `${speed}MBPS`
    }, {
      auth: {
        username: process.env.ROUTER_API_USERNAME,
        password: process.env.ROUTER_API_PASSWORD
      },
      httpsAgent: {
        rejectUnauthorized: false
      }
    });

    if (response.status === 200) {
      console.info(`User ${name} successfully created radius`);
      return res.status(200).json({ message: `User ${name} successfully created radius` });
    }

  } catch (error) {
    console.error(`User Radius Failed to Create`, error.message);
    next(createError(500, 'Internal Server Error'));
  }
};

const suspendOrUnsuspendUser = async (req, res, next) => {
  const { idSubs, customer_name, status } = req.body;

  try {
    if (status === 'suspend') {
      try {
        const idMikrotik = await axios.get(`${process.env.ROUTER_API_URL}/rest/user-manager/user?name=${idSubs}`, {
          auth: {
            username: process.env.ROUTER_API_USERNAME,
            password: process.env.ROUTER_API_PASSWORD
          },
          httpsAgent: {
            rejectUnauthorized: false
          }
        }).then(response => response.data);

        if (idMikrotik[0].disabled === 'true') {
          console.info(`Suspend Subs ${idSubs} (${customer_name}) already suspended`);
        } else {
          const response = await axios.patch(`${process.env.ROUTER_API_URL}/rest/user-manager/user/${idMikrotik[0]['.id']}`, {
            disabled: "true",
            comment: `Suspended by Billing System on ${new Date().toLocaleString()}`
          }, {
            auth: {
              username: process.env.ROUTER_API_USERNAME,
              password: process.env.ROUTER_API_PASSWORD
            },
            httpsAgent: {
              rejectUnauthorized: false
            }
          }).then(response => response.data);

          if (idMikrotik[0]['.id'] === response['.id']) {
            console.info(`Suspend Subs ${idSubs} (${customer_name}) success`);
          } else {
            console.error(`Suspend Subs ${idSubs} (${customer_name}) failed`);
          }
        }
      } catch (error) {
        console.error(`Suspend Subs ${idSubs} (${customer_name}) failed`, error.message);
        next(createError(500, 'Internal Server Error'));
      }
    } else if (status === 'unsuspend') {
      try {
        const idMikrotik = await axios.get(`${process.env.ROUTER_API_URL}/rest/user-manager/user?name=${idSubs}`, {
          auth: {
            username: process.env.ROUTER_API_USERNAME,
            password: process.env.ROUTER_API_PASSWORD
          },
          httpsAgent: {
            rejectUnauthorized: false
          }
        }).then(response => response.data);

        if (idMikrotik[0].disabled === 'false') {
          console.info(`Unsuspend Subs ${idSubs} (${customer_name}) already unsuspended`);
        } else {
          const response = await axios.patch(`${process.env.ROUTER_API_URL}/rest/user-manager/user/${idMikrotik[0]['.id']}`, {
            disabled: "false",
            comment: ""
          }, {
            auth: {
              username: process.env.ROUTER_API_USERNAME,
              password: process.env.ROUTER_API_PASSWORD
            },
            httpsAgent: {
              rejectUnauthorized: false
            }
          }).then(response => response.data);

          if (idMikrotik[0]['.id'] === response['.id']) {
            console.info(`Unsuspend Subs ${idSubs} (${customer_name}) success`);
          } else {
            console.error(`Unsuspend Subs ${idSubs} (${customer_name}) failed`);
          }
        }
      } catch (error) {
        console.error(`Unsuspend Subs ${idSubs} (${customer_name}) failed`, error.message);
        next(createError(500, 'Internal Server Error'));
      }
    }
  } catch (error) {
    console.error(error.message);
    next(createError(500, 'Internal Server Error'));
  }
};

const getByName = async (req, res, next) => {
  try {
    const dataMikrotik = await axios.get(`${process.env.ROUTER_API_URL}/rest/user-manager/user-profile`, {
      auth: {
        username: process.env.ROUTER_API_USERNAME,
        password: process.env.ROUTER_API_PASSWORD
      },
      httpsAgent: {
        rejectUnauthorized: false
      }
    }).then(response => response.data);

    const subs = await Subscription.find(); // Ganti dengan cara Anda mengambil data Subscription, bisa saja menggunakan Mongoose atau ORM lain

    for (const data of dataMikrotik) {
      if (subs.some(sub => sub.subscription_id === data.user)) {
        const subsUpdate = await Subscription.findOne({ subscription_id: data.user });

        const speed = data.profile.split("MBPS")[0].trim();

        if (speed !== subsUpdate.service.service_speed.toString()) {
          try {
            const idUserProfile = await axios.get(`${process.env.ROUTER_API_URL}/rest/user-manager/user-profile?user=${data.user}`, {
              auth: {
                username: process.env.ROUTER_API_USERNAME,
                password: process.env.ROUTER_API_PASSWORD
              },
              httpsAgent: {
                rejectUnauthorized: false
              }
            }).then(response => response.data);

            const deleteUSerProfile = await axios.delete(`${process.env.ROUTER_API_URL}/rest/user-manager/user-profile/${idUserProfile[0]['.id']}`, {
              auth: {
                username: process.env.ROUTER_API_USERNAME,
                password: process.env.ROUTER_API_PASSWORD
              },
              httpsAgent: {
                rejectUnauthorized: false
              }
            });

            const createUserProfile = await axios.put(`${process.env.ROUTER_API_URL}/rest/user-manager/user-profile`, {
              user: data.user,
              profile: `${subsUpdate.service.service_speed}MBPS`
            }, {
              auth: {
                username: process.env.ROUTER_API_USERNAME,
                password: process.env.ROUTER_API_PASSWORD
              },
              httpsAgent: {
                rejectUnauthorized: false
              }
            }).then(response => response.data);

            if (createUserProfile.successful) {
              console.info(`Update Subs ${subsUpdate.subscription_id} (${subsUpdate.customer.customer_name}) ${subsUpdate.billing_status} Success`);
            } else {
              console.error(`Update Subs ${subsUpdate.subscription_id} (${subsUpdate.customer.customer_name}) Failed`);
            }
          } catch (error) {
            console.error(`Failed to update Subs ${subsUpdate.subscription_id} (${subsUpdate.customer.customer_name})`, error.message);
            next(createError(500, 'Internal Server Error'));
          }
        }
      }
    }

    res.status(200).send('Process completed successfully.');
  } catch (error) {
    console.error(error.message);
    next(createError(500, 'Internal Server Error'));
  }
};

const sysns = async () => {
  try {
    const dataMikrotik = await axios.get(`${process.env.ROUTER_API_URL}/rest/user-manager/user`, {
      auth: {
        username: process.env.ROUTER_API_USERNAME,
        password: process.env.ROUTER_API_PASSWORD
      },
      httpsAgent: {
        rejectUnauthorized: false
      }
    }).then(response => response.data);

    const subs = await Subscription.find(); // Ganti dengan cara Anda mengambil data Subscription, bisa saja menggunakan Mongoose atau ORM lain

    for (const data of dataMikrotik) {
      if (subs.some(sub => sub.subscription_id === data.name)) {
        const ipAttributes = data.attributes.split(':');
        const subsUpdate = await Subscription.findOne({ subscription_id: data.name });

        if (ipAttributes.length > 1) {
          subsUpdate.ip_address = ipAttributes[1].trim();
          await subsUpdate.save();
        }
      }
    }

    console.log('Update IP addresses completed successfully.');
  } catch (error) {
    console.error('Failed to update IP addresses:', error.message);
    throw error;
  }
};


module.exports = {
  createUserAndProfile,
  suspendOrUnsuspendUser,
  getByName,
  sysns
};