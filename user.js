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