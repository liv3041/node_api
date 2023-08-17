// We should maintain hierarchy in app.js file
require("dotenv").config();
// Creating app
const express =  require("express");
const app = express();
require("./db/conn");
const cors = require("cors");
const router = require("./Routes/router");
const PORT =5004;
// We havent created connection yet
// **********************************************************
// Accessing db



// We will enable the cors module we have required above.
app.use(cors());
// we are writing cors() because the backend port number 
// and the front end port number is not same. So, to not show the error of cross origin we are importing the cors module
app.use(express.json()); 
app.use(router);
// Above line means that the incoming data from the frontend will be in json format. If we dont write this we wont get data in backend from request.body()

// ***********************************************************
// Setting up server
// Get response
// Success then response 200
app.get("/",(req,res)=>{
    res.status(200).json("server start");
});
// We will perform the above work in Routes

// server start
app.listen(PORT,() => {
    console.log(`Server started at Port No ${PORT}`);
});