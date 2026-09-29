const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const User = require("./models/User");

const app = express();

app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// POST - Create a new user
app.post("/api/users", async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        message: "Name and email are required.",
      });
    }

    const newUser = new User({
      name,
      email,
    });

    const savedUser = await newUser.save();

    return res.status(201).json(savedUser);
  } catch (error) {
    console.error("Error creating user:", error);

    return res.status(500).json({
      message: "Failed to create user.",
    });
  }
});

// GET - Retrieve all users
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();

    return res.status(200).json(users);
  } catch (error) {
    console.error("Error retrieving users:", error);

    return res.status(500).json({
      message: "Failed to retrieve users.",
    });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});