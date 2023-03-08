const express = require("express");
const bodyParser = require("body-parser");
const { system } = require("nodemon/lib/config");
const app = express();

const mongoose = require('mongoose');
const { json } = require("body-parser");
mongoose.connect("mongodb+srv://Jeldrik:Lc8CCmQMlVwjpPx6@budgettracker.cceywm4.mongodb.net/BudgetTrackerDB?retryWrites=true&w=majority").then(() => console.log("Revenue-Datenbank verbunden"));
const Revenue = mongoose.model('Revenue',{userid: String, value: Number, description: String, date: String})
const User = mongoose.model('User',{name: String, password: String})


let revenues = [];
let users = [];

app.use(bodyParser.json());


app.get("/api/v1/users/getRevenues/:id", function (req, res) { //Function wird von express selbst ausgefüllt
    if(req.params.id.toString().length == 24){
        User.findOne({ _id: req.params.id }).then(result => {
            if(result == null){
                console.log("Kein Nutzer mit dieser ID gefunden")
            }
            else{
                Revenue.find({userid: req.params.id.toString()}).then(result => console.log(result))
                console.log("Nutzer und Revenue gefunden")
            }
        })
    }
    else{
        console.log("Die eingegebene ID muss eine länge von 24 haben")
    }

});

app.post("/api/v1/users/postRevenues", function (req, res) {

    var date = new Date();
    day = date.getDate();
    month = date.getMonth();
    month = month + 1;
    if((String(day)).length == 1) day = '0' + day;
    if((String(month)).length == 1) month = '0' + month;
    dateT = day + '.' + month + '.' + date.getFullYear();

    const revenue = new Revenue({
        userid: req.body.userid,
        value: req.body.value,
        description: req.body.description,
        date : dateT
    })
    
    revenue.save().then(() => console.log("Neue Revenue angelegt"));
})

app.listen(3002, function () {
    console.log("Revenue-Service auf Port 3002 gestartet");
});
