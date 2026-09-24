const dns = require('dns');

dns.setServers([
    '1.1.1.1',
    '8.8.8.8'
]);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/Users');

require('dotenv').config({ path: './.env' });

const app = express();

app.use(cors());
app.use(express.json());


// CREATE USER

app.post("/createUser", (req, res) => {

    console.log("Received data:", req.body);

    UserModel.create(req.body)
        .then(user => {

            console.log("Created user:", user);

            res.json(user);

        })
        .catch(err => {

            console.log("Create error:", err);

            res.status(500).json(err);

        });

});


// DELETE USER

app.delete("/deleteUser/:id", (req, res) => {

    console.log("DELETE REQUEST RECEIVED");
    console.log("ID:", req.params.id);

    const id = req.params.id;

    UserModel.findByIdAndDelete(id)

        .then(result => {

            console.log("Deleted user:", result);

            res.json(result);

        })

        .catch(err => {

            console.log("Delete error:", err);

            res.status(500).json(err);

        });

});


// UPDATE USER

app.put("/updateUser/:id", (req, res) => {

    console.log("UPDATE REQUEST RECEIVED");
    console.log("ID:", req.params.id);
    console.log("Updated data:", req.body);

    UserModel.findByIdAndUpdate(

        req.params.id,

        {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age
        },

        { new: true }

    )

        .then(result => {

            console.log("Updated user:", result);

            res.json(result);

        })

        .catch(err => {

            console.log("Update error:", err);

            res.status(500).json(err);

        });

});


// GET ALL USERS

app.get("/getUsers", (req, res) => {

    UserModel.find({})

        .then(users => {

            console.log("Fetched users:", users);

            res.json(users);

        })

        .catch(err => {

            console.log("Fetch error:", err);

            res.status(500).json(err);

        });

});


// CONNECT TO MONGODB

mongoose.connect(process.env.MONGO_URI)

    .then(() => {

        console.log("MongoDB connected successfully");

    })

    .catch((error) => {

        console.log("MongoDB connection error:", error);

    });


// START SERVER

app.listen(3001, () => {

    console.log("Server is running on port 3001");

});