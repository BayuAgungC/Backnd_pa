import Transaction from "../model/TransactionModel.js";
import { Op } from "sequelize";

// Fetch all transactions with filters
export const getTransactions = async (req, res) => {
  try {
    const { type, startDate, endDate, search, clientId } = req.query;
    let where = {};
    
    if (type) {
      where.type = type;
    }
    if (startDate && endDate) {
      where.date = {
        [Op.between]: [new Date(startDate), new Date(endDate)],
      };
    }
    if (search) {
      where.description = {
        [Op.like]: `%${search}%`,
      };
    }
    if (clientId) {
      where.clientId = clientId; // Tambahkan filter berdasarkan clientId
    }

    const transactions = await Transaction.findAll({ where });
    res.status(200).json(transactions);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Failed to fetch transactions" });
  }
};

// Fetch a transaction by ID
export const getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      where: { id: req.params.id },
    });
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    res.status(200).json(transaction);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Failed to fetch transaction" });
  }
};

// Create a new transaction
export const createTransaction = async (req, res) => {
  try {
    const { description, amount, type } = req.body;
    if (!description || !amount || !type) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newTransaction = await Transaction.create(req.body);
    res.status(201).json({ message: "Transaction created", transaction: newTransaction });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Failed to create transaction" });
  }
};

// Update an existing transaction
export const updateTransaction = async (req, res) => {
  try {
    const { description, amount, type } = req.body;
    if (!description || !amount || !type) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const [updated] = await Transaction.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updated) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    res.status(200).json({ message: "Transaction updated" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Failed to update transaction" });
  }
};

// Delete a transaction
export const deleteTransaction = async (req, res) => {
  try {
    const deleted = await Transaction.destroy({
      where: { id: req.params.id },
    });
    if (!deleted) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    res.status(200).json({ message: "Transaction deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Failed to delete transaction" });
  }
};

export const dayTransaction = async (req, res) => {
  try {
    const today = new Date();
    const past30Days = new Date();
    past30Days.setDate(today.getDate() - 30);

    const transactions = await Transaction.findAll({
      where: {
        date: {
          [Op.between]: [past30Days, today],
        },
      },
      order: [["date", "ASC"]],
    });

    // Mengelompokkan data pemasukan dan pengeluaran
    const income = new Array(30).fill(0);
    const expense = new Array(30).fill(0);

    transactions.forEach((transaction) => {
      const daysAgo = Math.floor((today - new Date(transaction.date)) / (1000 * 60 * 60 * 24));
      if (transaction.type === "income") {
        income[29 - daysAgo] += transaction.amount;
      } else if (transaction.type === "expense") {
        expense[29 - daysAgo] += transaction.amount;
      }
    });

    res.json({ income, expense });
  } catch (error) {
    console.error("Error fetching last 30 days transactions:", error);
    res.status(500).json({ message: "Failed to fetch last 30 days transactions" });
  }
};
