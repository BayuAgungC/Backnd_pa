import Client from "../model/ClientModel.js";

// Get all clients
export const getClients = async (req, res) => {
  try {
    const response = await Client.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

// Get client by ID
export const getClientsById = async (req, res) => {
  try {
    const response = await Client.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!response) {
      return res.status(404).json({ message: 'Client not found' });
    }
    res.status(200).json(response);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

// Get client by NIK
export const getClientByNIK = async (req, res) => {
  try {
    const client = await Client.findOne({
      where: {
        nik: req.params.nik,
      },
    });
    if (client) {
      res.status(200).json(client);
    } else {
      res.status(404).json({ message: 'Client not found' });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

// Create a new client
export const createClient = async (req, res) => {
  try {
    await Client.create(req.body);
    res.status(201).json({ msg: "Client Created" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

// Update client data
export const updateClient = async (req, res) => {
  try {
    const client = await Client.findByPk(req.params.id);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    await client.update(req.body);
    res.status(200).json({ msg: "Client Updated" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

// Delete client
export const deleteClient = async (req, res) => {
  try {
    const client = await Client.findByPk(req.params.id);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    await client.destroy();
    res.status(200).json({ msg: "Client Deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};


