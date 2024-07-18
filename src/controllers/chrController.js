const axios = require('axios');

const https = require('https');

const Subscription = require('../../models/subscriptionsModel')


const getUserByName = async (req, res) => {
  try {
    const { name } = req.params;
    const routerApiUrl = process.env.ROUTER_API_URL;

    const response = await axios.get(`${routerApiUrl}/rest/user-manager/user?name=${name}`);

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

const getUserByNameProfile = async (req, res) => {
  try {
    const { name } = req.params;
    const routerApiUrl = process.env.ROUTER_API_URL;

    const response = await axios.get(`${routerApiUrl}/rest/user-manager/user-profile?user=${name}`);

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

const createProfile = async (req, res) => {
  try {
    // Mengambil data dari body permintaan
    const { name, password, attributes } = req.body;
    const routerApiUrl = process.env.ROUTER_API_URL;

    // Memeriksa apakah semua data yang diperlukan ada
    if (!name || !password || !attributes) {
      return res.status(400).json({ message: 'Name, password, and attributes are required' });
    }

    // Mengirim permintaan POST ke endpoint CHR
    const response = await axios.post(`${routerApiUrl}/rest/user-manager/user`, {
      name,
      password,
      attributes,
    }, {
      httpsAgent: new https.Agent({ rejectUnauthorized: false }) // Nonaktifkan verifikasi SSL untuk pengembangan
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

const createUserProfile = async (req, res) => {
  try {
    // Mengambil data dari body permintaan
    const { user, profile } = req.body;
    const routerApiUrl = process.env.ROUTER_API_URL;

    // Memeriksa apakah semua data yang diperlukan ada
    if (!user || !profile) {
      return res.status(400).json({ message: 'User and profile are required' });
    }

    // Mengirim permintaan POST ke endpoint CHR
    const response = await axios.post(`${routerApiUrl}/rest/user-manager/user-profile`, {
      user,
      profile,
    }, {
      httpsAgent: new https.Agent({ rejectUnauthorized: false }) // Nonaktifkan verifikasi SSL untuk pengembangan
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
    const response = await axios.put(`${routerApiUrl}/rest/user-manager/user/${name}`, {
      password,
      attributes,
    }, {
      httpsAgent: new https.Agent({ rejectUnauthorized: false }) // Nonaktifkan verifikasi SSL untuk pengembangan
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

const updateUserProfile = async (req, res) => {
  try {
    // Mengambil data dari body permintaan
    const { user, profile } = req.body;
    const routerApiUrl = process.env.ROUTER_API_URL;

    // Memeriksa apakah semua data yang diperlukan ada
    if (!user || !profile) {
      return res.status(400).json({ message: 'User and profile are required' });
    }

    // Mengirim permintaan PUT ke endpoint CHR untuk memperbarui user profile
    const response = await axios.put(`${routerApiUrl}/rest/user-manager/user-profile/${user}`, {
      profile,
    }, {
      httpsAgent: new https.Agent({ rejectUnauthorized: false }) // Nonaktifkan verifikasi SSL untuk pengembangan
    });

    // Kirim respons ke klien
    res.status(200).json({ message: 'User profile updated successfully', data: response.data });
  } catch (error) {
    console.error('Error updating user profile:', error.message);

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
    // Mengambil nama pengguna dari parameter URL
    const { userName } = req.params;
    const routerApiUrl = process.env.ROUTER_API_URL;

    if (!userName) {
      return res.status(400).json({ message: 'User name is required' });
    }

    // Mengirim permintaan DELETE ke endpoint CHR untuk menghapus user
    const response = await axios.delete(`${routerApiUrl}/rest/user-manager/user/${userName}`, {
      httpsAgent: new https.Agent({ rejectUnauthorized: false })
    });

    res.status(200).json({ message: 'User deleted successfully', data: response.data });
  } catch (error) {
    console.error('Error deleting user:', error.message);

    if (error.response) {
      res.status(error.response.status).json({ message: error.response.data });
    } else {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};

const deleteUserProfile = async (req, res) => {
  try {
    const { userProfile } = req.params;
    const routerApiUrl = process.env.ROUTER_API_URL;
    if (!userProfile) {
      return res.status(400).json({ message: 'User profile is required' });
    }
    const response = await axios.delete(`${routerApiUrl}/rest/user-manager/user-profile/${userProfile}`, {
      httpsAgent: new https.Agent({ rejectUnauthorized: false })
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

const suspendUser = async (req, res) => {
  try {
    const { userName } = req.params;
    const routerApiUrl = process.env.ROUTER_API_URL;

    if (!userName) {
      return res.status(400).json({ message: 'User name is required' });
    }

    // Mendapatkan tanggal saat ini
    const currentDate = new Date().toISOString().split('T')[0];

    // Mengirim permintaan PATCH ke endpoint CHR untuk menyuspend user
    const response = await axios.patch(`${routerApiUrl}/rest/user-manager/user/${userName}`, {
      disabled: "true",
      comment: `Suspended by Wijaya on ${currentDate}`,
    }, {
      httpsAgent: new https.Agent({ rejectUnauthorized: false })
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
    const routerApiUrl = process.env.ROUTER_API_URL;

    if (!userName) {
      return res.status(400).json({ message: 'User name is required' });
    }

    // Mengirim permintaan PATCH ke endpoint CHR untuk mengunsuspend user
    const response = await axios.patch(`${routerApiUrl}/rest/user-manager/user/${userName}`, {
      disabled: "false",
      comment: "",
    }, {
      httpsAgent: new https.Agent({ rejectUnauthorized: false })
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
  updateUserProfile,
  deleteUser,
  deleteUserProfile,
  suspendUser,
  unsuspendUser

};