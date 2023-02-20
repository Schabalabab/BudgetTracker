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