const express = require("express");
const bodyParser = require("body-parser");
const { system } = require("nodemon/lib/config");
const {ROUTES} = require("./routes");
const {setupProxies} = require("./proxy");
const app = express();

app.use(bodyParser.json());

setupProxies(app, ROUTES);

//v1
app.get("/api/v1", (req, res) => {
    //res.json(items);
    res.send("Willkommen bei meiner API!")
});


//users
app.get("/api/v1/users", (req, res) => {})
app.post("/api/v1/users", (req,res) => {})
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