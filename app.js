const express = require('express');
const app = express();
const hostname = '127.0.0.1';
const port = 5500;

app.use(express.json());
const path = require('path');
app.use(express.static(path.join(__dirname, "Front_End")));




app.get("/test", (req, res)=>{
    console.log("worked")
    res.send("Welcome to your server")
});

/*
app.listen(port, () => {
    console.log(`server running on port ${port}`);
    console.log(`Server running at http://${hostname}:${port}/`);
});
*/
//app.listen(port);
app.listen(port, () => {
    console.log(`server running on port ${port}`);
});


module.exports = app;