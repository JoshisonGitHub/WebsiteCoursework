const express = require('express');
const app = express();
const hostname = '127.0.0.1';
const port = 8090;

app.use(express.json());
const path = require('path');
app.use(express.static(path.join(__dirname, "Front_End")));




app.get("/", (req, res)=>{
    
    res.redirect("basepage.html");
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