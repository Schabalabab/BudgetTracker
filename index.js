const express = require("express");
const bodyParser = require("body-parser");
const { system } = require("nodemon/lib/config");
const app = express();

app.use(bodyParser.json());

//let items = [];
let users = [];
let index = 0;
let expenses = [];
let revenues = [];
let finances = [];


//v1
app.get("/api/v1", (req, res) => {
    //res.json(items);
    res.send("Willkommen bei meiner API!")
});


//users
app.get("/api/v1/users", (req, res) => {
    res.json(users);
});

app.post("/api/v1/users", (req,res) => {
    const user = {
        name: req.body.name,
        id: index,
        password: req.body.password
    };

    index += 1;
    users.push(user);
    res.json(user);
});

app.delete("/api/v1/users/:id", (req,res) => {
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


//id/finances
//Get Expenses
//Get Revenues
//Saldo berechnen

app.get("/api/v1/users/finances/:id", function (req, res) {
    const user = users.find(
        (user) => user.id === parseInt(req.params.id));

    if(!user) {
        return res.status(404)
        .send("The user with the given ID was not found.");
    }
    const expense = expenses.filter(
        (expense) => expense.userid == parseInt(req.params.id));
    const revenue = revenues.filter(
        (revenue) => revenue.userid == parseInt(req.params.id));
    
    let expense_all = 0
    for (let i=0 ; i < expense.length; i++){
        expense_all += parseInt(expense[i].value);
    };

    let revenue_all = 0
    for (let i=0 ; i < revenue.length; i++){
        revenue_all += parseInt(revenue[i].value);
    };

    const saldo = revenue_all - expense_all;
    const finance = {
        expenses: expense_all,
        revenues: revenue_all,
        saldo: saldo
    }

    finances.push(finance);

    res.json(finance);
    
}
)

//id/expenses


app.get("/api/v1/users/expenses/:id", function (req, res) { //Function wird von express selbst ausgefüllt
    const user = users.find(
        (user) => user.id === parseInt(req.params.id));

    if(!user) {
        return res.status(404)
        .send("The user with the given ID was not found.");
    }

    const expense = expenses.filter(
        (expense) => expense.userid == parseInt(req.params.id));

    if(!expense) {
        return res.status(404)
        .send("The expense with the given ID was not found.");
    }
    res.json(expense);
});

app.post("/api/v1/users/expenses", function (req, res) {
    var date=new Date();
    day=date.getDate();
    month=date.getMonth();
    month=month+1;
    if((String(day)).length==1)
    day='0'+day;
    if((String(month)).length==1)
    month='0'+month;
    dateT=day+ '.' + month + '.' + date.getFullYear();

    const expense = {
        userid: req.body.userid,
        value: req.body.value,
        description: req.body.description,
        date : dateT
    }

    expenses.push(expense);
    res.json(expense);
})

//id/revenues


app.get("/api/v1/users/revenues/:id", function (req, res) { //Function wird von express selbst ausgefüllt
    const user = users.find(
        (user) => user.id === parseInt(req.params.id));

    if(!user) {
        return res.status(404)
        .send("The user with the given ID was not found.");
    }

    const revenue = revenues.filter(
        (revenue) => revenue.userid == parseInt(req.params.id));

    if(!revenue) {
        return res.status(404)
        .send("The revenue with the given ID was not found.");
    }
    res.json(revenue);
});

app.post("/api/v1/users/revenues", function (req, res) {

    var date=new Date();
    day=date.getDate();
    month=date.getMonth();
    month=month+1;
    if((String(day)).length==1)
    day='0'+day;
    if((String(month)).length==1)
    month='0'+month;
    dateT=day+ '.' + month + '.' + date.getFullYear();

    const revenue = {
        userid: req.body.userid,
        value: req.body.value,
        description: req.body.description,
        date : dateT
    }

    revenues.push(revenue);
    res.json(revenue);
})

app.listen(3000, function () {
    console.log("API auf Port 3000 gestartet");
});