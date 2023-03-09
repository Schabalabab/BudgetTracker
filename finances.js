const express = require("express");
const bodyParser = require("body-parser");
const { system } = require("nodemon/lib/config");
const app = express();

const mongoose = require('mongoose');
const { json } = require("body-parser");
mongoose.connect("mongodb+srv://Jeldrik:Lc8CCmQMlVwjpPx6@budgettracker.cceywm4.mongodb.net/BudgetTrackerDB?retryWrites=true&w=majority")
.then(() => console.log("Finances-Datenbank verbunden"));
const Finances = mongoose.model('Finances',{userid: String, date: String, sumRevenues: Number, sumExpenses: Number, saldo: Number})
const User = mongoose.model('User',{name: String, password: String})
const Expense = mongoose.model('Expense',{userid: String, value: Number, description: String, date: String})
const Revenue = mongoose.model('Revenue',{userid: String, value: Number, description: String, date: String})


app.use(bodyParser.json());

app.get("/api/v1/users/getFinances/:id", async function (req, res) {
    if(req.params.id.toString().length == 24){
        let sumExpense = 0
        let sumRevenue = 0
        const user = await User.findOne({ _id: req.params.id })           
         if(user == null){
                console.log("Kein Nutzer mit dieser ID gefunden")
                return res.status(400).send("Kein Nutzer mit dieser ID gefunden")
            } 
        const expenseResult = await Expense.find({userid: req.params.id.toString()})
            expenseResult.forEach(element => {
                sumExpense = sumExpense + element.value
            })
        
        const revenueResult = await Revenue.find({userid: req.params.id.toString()})
        revenueResult.forEach(element => {
                sumRevenue = sumRevenue + element.value
            })
        
        
            console.log(sumRevenue)
            console.log(sumExpense)

            var date = new Date();
            day = date.getDate();
            month = date.getMonth();
            month = month + 1;
            if((String(day)).length == 1) day = '0' + day;
            if((String(month)).length == 1) month = '0' + month;
            dateT = day + '.' + month + '.' + date.getFullYear();

            let saldo = sumRevenue - sumExpense
            const finance = new Finances({
                userid: req.body.userid,
                date: dateT,
                sumRevenues: sumRevenue,
                sumExpenses: sumExpense,
                saldo: saldo
            })
            finance.save().then(() => console.log("Neue Finance angelegt"))
            res.json(finance)

        }else{
            Console.log("Die ID muss eine Länge von 24 haben")
            return res.status(400).send("Die ID muss eine Länge von 24 haben")
        }    
}
)


app.listen(3004, function () {
    console.log("Finances-Service auf Port 3004 gestartet");
});