import Tamu from "../model/TamuModel.js";
import { Op } from "sequelize";

export const getTamus = async (req, res) => {
  const { search, startDate, endDate } = req.query;

  let whereClause = {};

  if (search) {
    whereClause = {
      [Op.or]: [
        { nama: { [Op.like]: `%${search}%` } },
        { alamat: { [Op.like]: `%${search}%` } },
        { noTelp: { [Op.like]: `%${search}%` } },
        { keperluan: { [Op.like]: `%${search}%` } },
      ],
    };
  }

  if (startDate && endDate) {
    whereClause.tglKunjungan = {
      [Op.between]: [new Date(startDate), new Date(endDate)],
    };
  }

  try {
    const response = await Tamu.findAll({ where: whereClause });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Error retrieving data" });
  }
};

export const getTamusById = async (req, res) => {
  try {
    const response = await Tamu.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Error retrieving data" });
  }
};

export const createTamu = async (req, res) => {
  try {
    await Tamu.create(req.body);
    res.status(201).json({ msg: "Tamu Created" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Error creating Tamu" });
  }
};

export const updateTamu = async (req, res) => {
  try {
    await Tamu.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    res.status(200).json({ msg: "Tamu Updated" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Error updating Tamu" });
  }
};

export const deleteTamu = async (req, res) => {
  try {
    await Tamu.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json({ msg: "Tamu Deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Error deleting Tamu" });
  }
};
