const express = require("express");
const bodyParser = require("body-parser");
const { system } = require("nodemon/lib/config");
const app = express();

const mongoose = require('mongoose');
const { json } = require("body-parser");
mongoose.connect("mongodb+srv://Jeldrik:Lc8CCmQMlVwjpPx6@budgettracker.cceywm4.mongodb.net/BudgetTrackerDB?retryWrites=true&w=majority").then(() => console.log("User-Datenbank verbunden"));
const User = mongoose.model('User',{name: String, password: String})

//let users = [];
app.use(bodyParser.json());

// GET USER
app.get("/api/v1/getUsers", (req, res) => {
    User.find({}).then(result => res.json(result))
});

// CREATE USER
app.post("/api/v1/postUsers", (req,res) => {
    const user = new User({
        name: req.body.name,
        password: req.body.password
    });
    user.save().then(() => console.log("Neuer User angelegt"));
});

// DELETE USER
app.delete("/api/v1/deleteUsers/:id", (req,res) => {
    User.deleteOne({ _id: req.params.id }).then(result => {
        if(result.deletedCount == 0) {
            console.log("User mit ID "+ req.params.id + " nicht gefunden")
        }
        else{
            console.log("User mit ID "+ req.params.id + " gelöscht")
        }})
})

// EDIT USER
/*app.put("/api/v1/users/:id", (req,res) => {
    const user = users.find(
        (user) => user.id === parseInt(req.params.id));

    if(!user) {
        return res.status(404)
        .send("The item with the given ID was not found.");
    }

    user.name = req.body.name;
    res.json(user);     
});*/

// LISTEN TO PORT
app.listen(3001, function () {
    console.log("User-Service auf Port 3001 gestartet");
});