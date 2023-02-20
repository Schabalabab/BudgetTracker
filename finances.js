const express = require("express");
const bodyParser = require("body-parser");
const { system } = require("nodemon/lib/config");
const app = express();

app.use(bodyParser.json());

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


app.listen(3004, function () {
    console.log("Finances-Service auf Port 3004 gestartet");
});