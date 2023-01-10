const express = require("express");
const app = express();
const port = 8090;



app.use(express.json());
const path = require("path");
app.use(express.static(path.join(__dirname, "Front_End")));



app.get("/", (req, res)=>{
    res.redirect("basepage.html");
});


const fs = require("fs");
const gdb = "./gamedatabase.json";
const games = require(gdb);


app.post("/game/new", function (req, resp) {
    const key = req.body.gamename;
    const description = req.body.description;
    const picture = req.body.picture;
    console.log(picture);
    games[key] = description;
    games[picture] = picture;
    fs.writeFileSync(gdb, JSON.stringify(games));
    resp.send(games);
});





/*
app.get('/games', function (req, resp) {
    const gamename = Object.keys(games);
    resp.send(gamename);
});
*/


app.listen(port, () => {
    console.log(`server running on port ${port}`);
});


module.exports = app;