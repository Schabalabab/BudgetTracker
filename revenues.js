const express = require("express");
const bodyParser = require("body-parser");
const { system } = require("nodemon/lib/config");
const app = express();

app.use(bodyParser.json());


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

app.listen(3002, function () {
    console.log("Revenue-Service auf Port 3002 gestartet");
});
