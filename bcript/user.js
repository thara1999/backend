const express = require("express");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const userRouter = express.Router();

// Define the User schema
const userSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true }
    },
    {
        versionKey: false
    }
);

// Create the User model
const UserModel = mongoose.model("user", userSchema);

// Route to get all users (for testing)
userRouter.get("/", async (req, res) => {
    try {
        const users = await UserModel.find({}, { password: 0 }); // Exclude passwords
        res.send(users);
    } catch (error) {
        res.status(500).send({
            message: error.message,
            status: 0
        });
    }
});

// Route to register a new user
userRouter.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        let user = new UserModel({ name, email, password: hashedPassword });

        // Save the user to the database
        await user.save();

        res.send({
            message: "User created",
            status: 1
        });
    } catch (error) {
        res.status(400).send({
            message: error.message,
            status: 0
        });
    }
});

// Route to login a user
userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        let user = await UserModel.findOne({ email });

        if (user) {
            // Compare passwords
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                // Passwords match
                res.send({
                    message: "Logged in successfully",
                    status: 1
                });
            } else {
                // Passwords don't match
                res.send({
                    message: "Incorrect password",
                    status: 0
                });
            }
        } else {
            // User not found
            res.send({
                message: "User does not exist",
                status: 0
            });
        }
    } catch (error) {
        res.status(500).send({
            message: error.message,
            status: 0
        });
    }
});

module.exports = userRouter;
