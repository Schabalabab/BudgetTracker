const express = require("express");
const bodyParser = require("body-parser");
const { system } = require("nodemon/lib/config");
const {ROUTES} = require("./routes");
const {setupProxies} = require("./proxy");

const mongoose = require('mongoose');
//mongoose.connect("mongodb+srv://Jeldrik:Lc8CCmQMlVwjpPx6@budgettracker.cceywm4.mongodb.net/catsDB?retryWrites=true&w=majority").then(() => console.log("Datenbank connected"));

/*const Cat = mongoose.model('Cat', { name: String });
const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow'));

Cat.find({
    name: 'Zildjian'
}).then(result => console.log(result))

Cat.deleteMany({
    name: 'Zildjian'
}).then(result => console.log(result))*/

const app = express();

setupProxies(app, ROUTES);
app.use(bodyParser.json());


//v1
app.get("/api/v1", (req, res) => {
    //res.json(items);
    res.send("Willkommen bei meiner API!")
});


//users
app.get("/api/v1/getUsers", (req, res) => {})
app.post("/api/v1/postUsers", (req,res) => {})
app.delete("/api/v1/users/:id", (req,res) => {})
app.put("/api/v1/users/:id", (req,res) => {})

//finances
app.get("/api/v1/users/finances/:id", function (req, res) {})

//expenses
app.get("/api/v1/users/expenses/:id", function (req, res) {})

app.post("/api/v1/users/expenses", function (req, res) {})

//revenues
app.get("/api/v1/users/revenues/:id", function (req, res) {});

app.post("/api/v1/users/revenues", function (req, res) {})

app.listen(3000, function () {
    console.log("API auf Port 3000 gestartet");
});