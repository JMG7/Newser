const mongoose = require("mongoose");
const express = require("express");

const newsRoutes = require("./routes/news");
const userRoutes = require("./routes/user");

const app = express();

let MongoDB_URI = "";
if(process.env.NODE_ENV=="development"){
    console.log("Running node in Dev");
    MongoDB_URI =
        process.env.MONGO_DEV_URL + 
        process.env.DDBB_NAME
    console.log({URL: MongoDB_URI});
}
else {
    console.log("Running node in Pro");
    MongoDB_URI =
        process.env.MONGO_PRO_URL + 
        process.env.DDBB_NAME + 
        process.env.MONGO_PRO_PARAMS;
    console.log({URL: MongoDB_URI});
};

mongoose
    .connect(MongoDB_URI)
    .then(() => {
        console.log({
            message:"Connected to database!",
            uri: MongoDB_URI
        });
    })
    .catch((error) => {
        console.log({message: "Connection failed!", error: error});
    });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
    );
    next();
});

//EXPRESS
app.use("/api/news", newsRoutes);
app.use("/api/user", userRoutes);

module.exports = {app:app};