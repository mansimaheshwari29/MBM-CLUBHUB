require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");

const app = express();
app.use(express.static("public"));
const pass = process.env.PASSWORD;
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect("mongodb+srv://admin-simran:"+pass+"@cluster0.torww.mongodb.net/ISROuserDB", {useNewUrlParser: true});

const userSchema = new mongoose.Schema( {
    email: String,
    password: String
});
const secret = process.env.SECRET;
userSchema.plugin(encrypt, {secret: secret, encryptedFields: ['password']});

const User = new mongoose.model("User", userSchema);

app.get("/", function(req, res){
    res.sendFile(__dirname+"/home1.html");
});

app.post("/signup", function(req, res){
    const newUser = new User({
        email: req.body.username,
        password: req.body.password
    });
    newUser.save(function(err){
        if(err){
            console.log(err);
        } else{
            // res.render("secrets");
            console.log("signup successful");
        }
    });
});

app.post("/login", function(req, res){
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({email: username}, function(err, foundUser){
        if(err){
            console.log(err);
        }else{
            if(foundUser) {
                if(foundUser.password === password){
                    // res.render("secrets");
                    console.log("login successful");
                }
                else{
                    console.log("Wrong Password");
                }
            }
        }
    });
});

app.listen(5000, function(){
    console.log("server started and running on port 5000");
});
app.get("/document", function(req, res){
    res.sendFile(__dirname+"/document.html");
});
app.get("/learn", function(req, res){
    res.sendFile(__dirname+"/learn.html");

});
app.get("/home1", function(req, res){
    res.sendFile(__dirname+"/home1.html");

});