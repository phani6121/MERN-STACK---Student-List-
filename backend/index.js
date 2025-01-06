const express = require("express");
// node js framework
const mongoose = require("mongoose");
// node js library
const cors = require("cors");
// Cross - Origin Resource Sharing
const dotenv = require("dotenv");
// dotenv is a popular package that helps you manage environment variables in your application.Environment variables are key - value pairs used to store configuration settings, such as database credentials, API keys, or application secrets, in a way that doesn't hardcode them into your codebase.

const app = express();

// Add router
const router = require("./routes/router");

dotenv.config();
// When you call dotenv.config();, it loads the environment variables from the.env file into the process.env object in Node.js.After this, you can access the values using process.env

app.use(cors());
app.use(express.json());
app.use(router);

mongoose.connect(process.env.Database)
    .then(() => {
        console.log("Database connection successful");
    })
    .catch((err) => {
        console.error("Database connection error:", err);
    });

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
