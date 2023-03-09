const express = require("express");
const bodyParser = require("body-parser");
const { system } = require("nodemon/lib/config");
const app = express();

const mongoose = require('mongoose');
const { json } = require("body-parser");
mongoose.connect("mongodb+srv://Jeldrik:Lc8CCmQMlVwjpPx6@budgettracker.cceywm4.mongodb.net/BudgetTrackerDB?retryWrites=true&w=majority")
.then(() => console.log("Expense-Datenbank verbunden"));
const Expense = mongoose.model('Expense',{userid: String, value: Number, description: String, date: String})
const User = mongoose.model('User',{name: String, password: String})

app.use(bodyParser.json());


app.get("/api/v1/users/getExpenses/:id", function (req, res) { //Function wird von express selbst ausgefüllt
    if(req.params.id.toString().length == 24){
        User.findOne({ _id: req.params.id }).then(result => {
            if(result == null){
                console.log("Kein Nutzer mit dieser ID gefunden")
                return res.status(400).send("Kein Nutzer mit dieser ID gefunden")
            }
            else{
                Expense.find({userid: req.params.id.toString()}).then(result => res.json(result))
                console.log("Nutzer und Expense gefunden")
            }
        })
    }
    else{
        console.log("Die angegebene ID muss eine Länge von 24 haben")
        return res.status(400).send("ID muss eine Länge von 24 haben")
    }
});

app.post("/api/v1/users/postExpenses", function (req, res) {
    var date = new Date();
    day = date.getDate();
    month = date.getMonth();
    month = month + 1;
    if((String(day)).length == 1) day = '0' + day;
    if((String(month)).length == 1) month = '0' + month;
    dateT = day + '.' + month + '.' + date.getFullYear();

    const expense = new Expense({
        userid: req.body.userid,
        value: req.body.value,
        description: req.body.description,
        date : dateT
    })

    if(req.body.userid.toString().length == 24){
        User.findOne({_id: expense.userid}).then(result => {
            if(result == null){
                console.log("Die angegebene UserID existiert nicht")
                return res.status(400).send("Kein Nutzer mit dieser ID gefunden")
            }
            else{
                expense.save().then(() => console.log("Neue Expense angelegt"));
                return res.status(200).send("Neue Expense angelegt")
            }
        })
    }
    else{
        console.log("Die angegebene ID muss eine länge von 24 haben")
        return res.status(400).send("Die angegebene ID muss eine länge von 24 haben")
    }
})

app.listen(3003, function () {
    console.log("Expenses-Service auf Port 3003 gestartet");
});