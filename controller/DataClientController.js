import DataClient from '../model/DataClientModel.js';
export const getDataClients = async (req, res) => {
  try {
    const dataClients = await DataClient.findAll();

    // Konversi setiap BLOB ke base64
    const dataClientsWithBase64 = dataClients.map((client) => {
      const fileBase64 = client.file ? Buffer.from(client.file).toString('base64') : null;
      return {
        ...client.toJSON(),
        file: fileBase64 ? `data:application/pdf;base64,${fileBase64}` : null // sesuaikan 'application/pdf' sesuai jenis file
      };
    });

    res.status(200).json(dataClientsWithBase64);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve data clients', error: error.message });
  }
};



export const createDataClient = async (req, res) => {
  const { nama, kepemilikan, createdBy } = req.body;
  const file = req.file;
  
  if (!file) return res.status(400).json({ message: 'File is required' });

  try {
    const newDataClient = await DataClient.create({
      nama,
      kepemilikan,
      file: file.buffer,
      createdBy,
    });
    res.status(201).json(newDataClient);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create data client', error: error.message });
  }
};

export const updateDataClient = async (req, res) => {
  const { id } = req.params;
  const { nama, kepemilikan, updatedBy } = req.body;
  let fileData = null;

  try {
    const dataClient = await DataClient.findByPk(id);
    if (!dataClient) return res.status(404).json({ message: 'Data client not found' });

    fileData = req.file ? req.file.buffer : dataClient.file;

    await dataClient.update({
      nama,
      kepemilikan,
      file: fileData,
      updatedBy: updatedBy || 'unknown'
    });

    res.status(200).json({ message: 'Data client updated', dataClient });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update data client', error: error.message });
  }
};


export const deleteDataClient = async (req, res) => {
  const { id } = req.params;

  try {
    const dataClient = await DataClient.findByPk(id);
    if (!dataClient) return res.status(404).json({ message: 'Data client not found' });

    await dataClient.destroy();
    res.status(200).json({ message: 'Data client deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete data client', error: error.message });
  }
};
