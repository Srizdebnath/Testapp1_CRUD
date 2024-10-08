const express = require ('express');
const app = express();
const path = require('path');
const userModel = require('./models/user');

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(express.static(path.join(__dirname, 'public')));

app.set("view engine" , "ejs");


app.get("/",function(req,res){
    res.render("index");
})

app.get("/read",async function(req,res){
    let allusers = await userModel.find();
    res.render("read", {users: allusers});
})

app.post("/create", async function(req,res){
    let {name, email, imageurl} = req.body;
    let createdUser = await userModel.create({
        name,
        email,
        imageurl
    })
    res.redirect("/read");
})

app.get("/delete/:id",async function(req,res){
    let users = await userModel.findOneAndDelete({_id: req.params.id});
    res.redirect("/read");
})

app.get("/edit/:id",async function(req,res){
    let user = await userModel.findOne({_id: req.params.id});
    res.render("edit", {user});
})

app.post("/update/:id",async function(req,res){
    let {imageurl, name, email} = req.body;
    let Updateduser = await userModel.findOneAndUpdate({_id: req.params.id}, {imageurl, name, email}, {new: true});
    res.redirect("/read");
})


app.listen(3000);