const express = require("express");
const bodyParser = require("body-parser");
const { system } = require("nodemon/lib/config");
const app = express();

const mongoose = require('mongoose');
const { json } = require("body-parser");
mongoose.connect("mongodb+srv://Jeldrik:Lc8CCmQMlVwjpPx6@budgettracker.cceywm4.mongodb.net/userDB?retryWrites=true&w=majority").then(() => console.log("User-Datenbank connected"));
const User = mongoose.model('User',{id: Number, name: String, password: String})
const globalId = mongoose.model('globalID',{id: Number})


/*const test = new User({id: 0, name: 'test', password: '1324'});
test.save().then(() => console.log(test.name));*/

let users = [];
let index = 0;

app.use(bodyParser.json());

app.get("/api/v1/getUsers", (req, res) => {
    User.find({
        }).then(result => res.json(result))
});

app.post("/api/v1/postUsers", (req,res) => {
    //W-I-P
    globalId.find().then(result => console.log())
    globalId.findByIdAndUpdate('6407080ab0d1844e0e6345d9', { $inc: { globalID: 1 } })
    const user = new User({
        id: index,
        name: req.body.name,
        password: req.body.password
    });
    user.save().then(() => console.log("gespeichert"))
    res.json(user);
});

app.delete("/api/v1/deleteUsers/:id", (req,res) => {
    const user = users.find(
        (user) => user.id === parseInt(req.params.id));

    if(!user) {
        return res.status(404)
        .send("The user with the given ID was not found.");
    }

    const index = users.indexOf(user);
    users.splice(index, 1);
})

app.put("/api/v1/users/:id", (req,res) => {
    const user = users.find(
        (user) => user.id === parseInt(req.params.id));

    if(!user) {
        return res.status(404)
        .send("The item with the given ID was not found.");
    }

    user.name = req.body.name;
    res.json(user);     
});

app.listen(3001, function () {
    console.log("User-Service auf Port 3001 gestartet");
});