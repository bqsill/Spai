const express = require('express');
const mongoose = require('mongoose');

var app = express();

var conn_str = "mongodb+srv://bqsill:<Sanchez3$2>@spai.h0rwygg.mongodb.net/?retryWrites=true&w=majority&appName=Spai";

// Connect to the db 
mongoose.connect(conn_str, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("Successfully connected to the database");
    })
    .catch((err) => {
        console.log("An error occurred while connecting to the database: ", err);
    });
    
const netInfo = {
    host: "localhost",
    port: 3000,
    blacklistedIps: new Array(5000).map((_, i) => '0.0.0.0')
}

var userInfo = {
    username: "",
    password: "",
    email: "",
    ip: "",
    role: "",
    isActive: "",
}


app.get("/", function(req, res) {
    if (req.ip != "127.0.0.1" && req.ip != "localhost" && req.ip != "::1") {
        // Code for when the host is accessed from an external IP
        if (netInfo.blacklistedIps.includes(req.ip)) {
            res.writeHead(403);
            res.end("Access Forbidden");
        } else {
            res.redirect("/home.html");
        }
    } else {
        res.sendFile(__dirname + "/home.html");
    }
});

app.get("/admin", function(req, res) {
    res.sendFile(__dirname + "/admin.html");
})

app.get("/login", function(req, res) {
    res.sendFile(__dirname + "/login.html");
})

app.get("/register", function(req, res) {
    res.sendFile(__dirname + "/register.html");
})


app.listen(3000, function() {
    console.log("Server is running on port 3000");
})

function isAllowed(userInfo,requested_page){
    if(userInfo.role == "admin"){
        return true;
    }
    else if(userInfo.role == "user"){
        if(requested_page == "home.html"){
            return true;
        }
        else if(requested_page == "login.html"){
            return true;
        }
        else if(requested_page == "register.html"){
            return true;
        }
        else{
            return false;
        }
    }
    else{
        return false;
    }
}