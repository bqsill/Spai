const express = require('express');
const mongoose = require('mongoose');

var app = express();
// Connect to the db 
mongoose.connect(netInfo.conn_str)
    .then(() => {
        console.log("Successfully connected to the database");
    })
    .catch((err) => {
        console.log("An error occurred while connecting to the database: ", err);
    });
    
const netInfo = {
    host: "localhost",
    port: 3000,
    blacklistedIps: Array.from({ length: 5000 }, () => '0.0.0.0'), // Properly initialize the array
    conn_str: "mongodb+srv://bqsill:aaryan11@spai.h0rwygg.mongodb.net/?retryWrites=true&w=majority&appName=Spai"
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
    app.get("/", function(req,res) { 
        res.sendFile(__dirname + "/login.html");
    })
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