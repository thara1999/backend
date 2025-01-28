const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const userRouter = require("./user"); // Import the userRouter

const app = express();
const PORT = 3000;
const mongoURI = process.env.MONGO_URI;

// Connect to MongoDB Atlas
mongoose.connect(mongoURI)
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((error) => console.error("MongoDB connection error:", error));

// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use("/user", userRouter); // Use the userRouter for all '/user' routes

app.get("/", (req, res) => {
    res.send("Hello World!");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
//npm i cors express nodemon mongoose mongodb bcrypt dotenv

