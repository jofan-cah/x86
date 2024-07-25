const axios = require('axios');

const https = require('https');

const Subscription = require('../../models/subscriptionsModel')

const agent = require('../../helpers/http');
const getFormattedDateTime = require('../../helpers/time');

const routerApiUrl = process.env.ROUTER_API_URL;


// User CHR 
const createProfile = async (req, res) => {
  try {
    // Mengambil data dari body permintaan
    const { name, password, attributes } = req.body;
    console.log('Request Body:', req.body);

    // Memeriksa apakah semua data yang diperlukan ada
    if (!name || !password || !attributes) {
      return res.status(400).json({ message: 'Name, password, and attributes are required' });
    }

    // Mengirim permintaan POST ke endpoint CHR
    const response = await axios.put(`${routerApiUrl}/rest/user-manager/user`, {
      name,
      password,
      attributes,
    }, {
      auth: {
        username: process.env.ROUTER_API_USERNAME,
        password: process.env.ROUTER_API_PASSWORD
      },
      httpsAgent: agent,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Kirim respons ke klien
    res.status(201).json({ message: 'User profile created successfully', data: response.data });
  } catch (error) {
    console.error('Error creating user profile:', error.message);

    if (error.response) {
      console.error('Error response data:', error.response.data); // Menampilkan data kesalahan
      console.error('Error response status:', error.response.status); // Menampilkan status kode kesalahan
      res.status(error.response.status).json({ message: error.response.data });
    } else {
      console.error('Error without response:', error); // Menampilkan kesalahan lain
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};


const getUserByName = async (req, res) => {
  try {

    const name = req.query.name;
    const routerApiUrl = process.env.ROUTER_API_URL;

    console.log(name)


    const response = await axios.get(`${routerApiUrl}/rest/user-manager/user?name=${name}`, {
      auth: {
        username: process.env.ROUTER_API_USERNAME,
        password: process.env.ROUTER_API_PASSWORD
      },

      httpsAgent: agent
    });

    // Kirim respons ke klien
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching user:', error.message);

    if (error.response) {
      // Kesalahan berasal dari respons server
      res.status(error.response.status).json({ message: error.response.data });
    } else {
      // Kesalahan berasal dari server kita sendiri (misalnya kesalahan jaringan)
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};


const updateUser = async (req, res) => {
  try {
    // Mengambil data dari body permintaan
    const { name, password, attributes } = req.body;
    const routerApiUrl = process.env.ROUTER_API_URL;

    // Memeriksa apakah semua data yang diperlukan ada
    if (!name || !password || !attributes) {
      return res.status(400).json({ message: 'Name, password, and attributes are required' });
    }

    // Mengirim permintaan PUT ke endpoint CHR untuk memperbarui user
    const response = await axios.patch(`${routerApiUrl}/rest/user-manager/user/${name}`, {
      password,
      attributes,
    }, {
      auth: {
        username: process.env.ROUTER_API_USERNAME,
        password: process.env.ROUTER_API_PASSWORD
      },
      httpsAgent: agent,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Kirim respons ke klien
    res.status(200).json({ message: 'User updated successfully', data: response.data });
  } catch (error) {
    console.error('Error updating user:', error.message);

    if (error.response) {
      // Kesalahan berasal dari respons server
      res.status(error.response.status).json({ message: error.response.data });
    } else {
      // Kesalahan berasal dari server kita sendiri (misalnya kesalahan jaringan)
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};

const deleteUser = async (req, res) => {
  try {
    const { userName } = req.params;
    if (!userName) {
      return res.status(400).json({ message: 'User name is required' });
    }

    // Mengirim permintaan DELETE ke endpoint CHR untuk menghapus user
    const response = await axios.delete(`${routerApiUrl}/rest/user-manager/user/${userName}`, {
      auth: {
        username: process.env.ROUTER_API_USERNAME,
        password: process.env.ROUTER_API_PASSWORD
      },
      httpsAgent: agent,

    });

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error.message);

    if (error.response) {
      res.status(error.response.status).json({ message: error.response.data });
    } else {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};


// User Profile

const getUserByNameProfile = async (req, res) => {
  try {
    const name = req.query.name;
    console.log(name)

    const response = await axios.get(`${routerApiUrl}/rest/user-manager/user-profile?user=${name}`, {
      auth: {
        username: process.env.ROUTER_API_USERNAME,
        password: process.env.ROUTER_API_PASSWORD
      },

      httpsAgent: agent
    });


    // Kirim respons ke klien
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching user:', error.message);

    if (error.response) {
      // Kesalahan berasal dari respons server
      res.status(error.response.status).json({ message: error.response.data });
    } else {
      // Kesalahan berasal dari server kita sendiri (misalnya kesalahan jaringan)
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};


const createUserProfile = async (req, res) => {
  try {
    // Mengambil data dari body permintaan
    const { user, profile } = req.body;


    // Memeriksa apakah semua data yang diperlukan ada
    if (!user || !profile) {
      return res.status(400).json({ message: 'User and profile are required' });
    }

    console.log(req.body)

    // Mengirim permintaan POST ke endpoint CHR
    const response = await axios.put(`${routerApiUrl}/rest/user-manager/user-profile`, {
      user,
      profile,
    }, {
      auth: {
        username: process.env.ROUTER_API_USERNAME,
        password: process.env.ROUTER_API_PASSWORD
      },

      httpsAgent: agent,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Kirim respons ke klien
    res.status(201).json({ message: 'User profile created successfully', data: response.data });
  } catch (error) {
    console.error('Error creating user profile:', error.message);

    if (error.response) {
      // Kesalahan berasal dari respons server
      res.status(error.response.status).json({ message: error.response.data });
    } else {
      // Kesalahan berasal dari server kita sendiri (misalnya kesalahan jaringan)
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};


// const updateUserProfile = async (req, res) => {
//   try {
//     // Mengambil data dari body permintaan
//     const id = req.body[".id"];  // Gunakan notasi tanda kurung untuk mengakses ".id"
//     const profile = req.body.profile;
//     console.log(req.body)

//     // Memeriksa apakah semua data yang diperlukan ada
//     if (!id || !profile) {
//       return res.status(400).json({ message: 'User and profile are required' });
//     }

//     // Mengirim permintaan PUT ke endpoint CHR untuk memperbarui user profile
//     const response = await axios.patch(`${routerApiUrl}/rest/user-manager/user-profile/${id}`, {
//       profile,
//     }, {
//       auth: {
//         username: process.env.ROUTER_API_USERNAME,
//         password: process.env.ROUTER_API_PASSWORD
//       },
//       httpsAgent: new https.Agent({
//         rejectUnauthorized: false
//       }),
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });
//     // Kirim respons ke klien
//     res.status(200).json({ message: 'User profile updated successfully', data: response.data });
//   } catch (error) {
//     console.error('Error updating user profile:', error.message);

//     if (error.response) {
//       // Kesalahan berasal dari respons server
//       res.status(error.response.status).json({ message: error.response.data });
//     } else {
//       // Kesalahan berasal dari server kita sendiri (misalnya kesalahan jaringan)
//       res.status(500).json({ message: 'Internal Server Error' });
//     }
//   }
// };


const deleteUserProfile = async (req, res) => {
  try {
    const { userProfile } = req.params;
    const routerApiUrl = process.env.ROUTER_API_URL;
    if (!userProfile) {
      return res.status(400).json({ message: 'User profile is required' });
    }
    const response = await axios.delete(`${routerApiUrl}/rest/user-manager/user-profile/${userProfile}`, {
      auth: {
        username: process.env.ROUTER_API_USERNAME,
        password: process.env.ROUTER_API_PASSWORD
      },
      httpsAgent: agent,

    });

    res.status(200).json({ message: 'User profile deleted successfully', data: response.data });
  } catch (error) {
    console.error('Error deleting user profile:', error.message);

    if (error.response) {
      res.status(error.response.status).json({ message: error.response.data });
    } else {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};


const patchUserStatus = async (disabled, comment, subsid) => {
  try {
    const formattedDateTime = getFormattedDateTime();
    const response = await axios.patch(`${routerApiUrl}/rest/user-manager/user/${userName}`, {
      disabled: "false",
      comment: `Suspended by System on ${formattedDateTime}`,
    }, {
      auth: {
        username: process.env.ROUTER_API_USERNAME,
        password: process.env.ROUTER_API_PASSWORD
      },
      httpsAgent: agent,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error sending PATCH request:', error.message);
    throw error; // Propagate the error to be handled by the caller
  }
};


// SUSPEND CHR
const suspendUser = async (req, res) => {
  try {
    const { userName } = req.params;
    const { disabled, comment } = req.body;

    if (!userName) {
      return res.status(400).json({ message: 'User name is required' });
    }

    // Mengirim permintaan PATCH ke endpoint CHR untuk menyuspend user
    const response = await axios.patch(`${routerApiUrl}/rest/user-manager/user/${userName}`, {
      disabled,
      comment,
    }, {
      auth: {
        username: process.env.ROUTER_API_USERNAME,
        password: process.env.ROUTER_API_PASSWORD
      },

      httpsAgent: agent,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    res.status(200).json({ message: 'User suspended successfully', data: response.data });
  } catch (error) {
    console.error('Error suspending user:', error.message);

    if (error.response) {
      res.status(error.response.status).json({ message: error.response.data });
    } else {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};

const unsuspendUser = async (req, res) => {

  try {
    const { userName } = req.params;
    const { disabled, comment } = req.body;

    if (!userName) {
      return res.status(400).json({ message: 'User name is required' });
    }
    if (!disabled) {
      return res.status(400).json({ message: 'dissable and comment name is required' });
    }

    // Mengirim permintaan PATCH ke endpoint CHR untuk mengunsuspend user
    const response = await axios.patch(`${routerApiUrl}/rest/user-manager/user/${userName}`, {
      disabled,
      comment,
    }, {
      auth: {
        username: process.env.ROUTER_API_USERNAME,
        password: process.env.ROUTER_API_PASSWORD
      },

      httpsAgent: agent,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    res.status(200).json({ message: 'User unsuspended successfully', data: response.data });
  } catch (error) {
    console.error('Error unsuspending user:', error.message);

    if (error.response) {
      res.status(error.response.status).json({ message: error.response.data });
    } else {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};

module.exports = {
  getUserByName,
  getUserByNameProfile,
  createProfile,
  createUserProfile,
  updateUser,
  // updateUserProfile,
  deleteUser,
  deleteUserProfile,
  suspendUser,
  unsuspendUser

};