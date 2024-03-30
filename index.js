const express = require('express');
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const app = express();
const methodOverride = require("method-override")
const port = 8080;


app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let userData = [
    {
        id: uuidv4(),
        username: "Mohd Shubair",
        content: "hello how are you all",
    },

    {
        id: uuidv4(),
        username: "Ali zaman",
        content: "hello how are you all...I am zaman",
    },

    {
        id: uuidv4(),
        username: "Ali abbas",
        content: "hello how are you all..I am ali",
    },

    {
        id: uuidv4(),
        username: "physicswallah",
        content: "hello how are you all...I AM PHYSICSWALLAH",
    },
];

app.get("/posts", (req, res) => {
    res.render("index.ejs", { userData });
});

app.get("/posts/new", (req, res) => {
    res.render("newPost.ejs");
});

app.post("/posts", (req, res) => {
    let { username, content } = req.body;
    let newId = uuidv4();
    userData.push({ newId, username, content });
    res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let user = userData.find((u) => id === u.id);
    res.render("show.ejs", { user, postId: id });
});

app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newContent = req.body.content;
    let user = userData.find((u) => id === u.id);
    user.content = newContent;
    res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let user = userData.find((u) => id === u.id);
    res.render("edit.ejs", { user });
});

app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    userData = userData.filter((u) => id !== u.id);
    res.redirect("/posts");
});

app.listen(port, () => {
    console.log(`Port is listening with ${port}.......`);
});