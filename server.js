const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const portfinder = require("portfinder"); // Import portfinder package

const app = express();
const desiredPort = 5007; // The desired port

// MongoDB Atlas connection string (Replace with your credentials)
const mongoURI = "mongodb+srv://anuragkokate9900:yLVuGu2KN5rP93au@cluster0.7mc6o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Mongoose connection to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB: ", error);
    });

// Create a User schema and model
const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
});

const User = mongoose.model("User", userSchema);

// Secret key for JWT (store it in environment variables in production)
const secretKey = "your-secret-key"; // You should use an environment variable for the key in production

// Middlewares
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse incoming JSON data

// JWT Authentication Middleware
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Extract token from the Authorization header

    if (!token) {
        return res.status(401).json({ message: "Access Denied, No Token Provided" });
    }

    try {
        const verified = jwt.verify(token, secretKey); // Verify the token using the secret key
        req.user = verified; // Store the decoded user data in the request object
        next(); // Proceed to the next middleware or route
    } catch (error) {
        res.status(400).json({ message: 'Invalid Token' });
    }
};

// Route for user sign-up
app.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "User signed up successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error during sign-up", error });
    }
});

// Route for user login
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        // Compare the hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: "1h" }); // Token expires in 1 hour

        res.json({ message: "Login successful", token, user });
    } catch (error) {
        res.status(500).json({ message: "An error occurred during login", error });
    }
});

// Protected route (example: profile)
app.get("/profile", verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId); // Access user data from the decoded JWT
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ user }); // Return user data
    } catch (error) {
        res.status(500).json({ message: "Error fetching profile", error });
    }
});

// Protected route (example: delete account)
app.delete("/delete-account", verifyToken, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.user.userId); // Delete the user by their ID from the JWT
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "Account deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting account", error });
    }
});

// Expose the dynamic port via an endpoint
app.get("/get-port", (req, res) => {
    res.json({ port: desiredPort });
});

// Use portfinder to ensure the server listens on the desired port or a fallback if it's in use
portfinder.basePort = desiredPort; // Set the starting point for portfinder
portfinder.getPortPromise().then((port) => {
    app.listen(port, () => {
        console.log(`Backend server is running on http://localhost:${port}`);
    });
}).catch((err) => {
    console.error("Error finding a free port:", err);
});
