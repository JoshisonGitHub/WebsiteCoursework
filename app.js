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
//const game = {};

app.post("/game/new", function (req, resp) {
    const gamename = req.body.gamename;
    const date = req.body.date;
    const picture = req.body.picture;

    
    //console.log(picture);
    

    
       
    let num = Object.keys(games).length+1;
    //console.log(num);
    
    let gameExist = false;
    Object.keys(games).forEach(function(key) {
        if(games[key].gamename === gamename){
            //console.log(games[key].gamename);
            Object.keys(games).forEach(function(name) {
                console.log(games[name].gamedata[0].gamename);
                if(games[name].gamedata[0].gamename === gamename){
                    games[name].gamedata.push({gamename, date, picture})
                    
              
                }
            });
            gameExist = true;
            num--;
        }
    });
    //console.log(gameExist)
    
    
   
   
   
    if(!gameExist){
        games["Game Number " + num] = {gamename, gamedata: [{gamename, date, picture}]};
    }
    




    fs.writeFileSync(gdb, JSON.stringify(games));
    resp.send(games);
});








app.get('/games', function (req, resp) {
    const newname = [];
    Object.keys(games).forEach(function(key) {
        newname.push(games[key].gamename)
    });
    if(newname.length == 0){
        resp.status(404).send("No Game in list");
    }
    else{
        resp.send(newname);
    }
    
});
fetch("http://localhost:8090/games")
  .then(function (response) {
    return response.text();
  })
  .then(function (text) {
    console.log(text);
  });


app.get("/game/:gamedata", function (req, resp) {
    const newdata = [];
    Object.keys(games).forEach(function(key) {
        newdata.push(games[key].gamedata)
    });

    if(newdata.length == 0){
        resp.status(404).send("Game not found");
    }
    else{
        resp.send(newdata);
    }

    /*
    const gamedata = Object.keys(games["game"]);
    console.log(gamedata)
    console.log(games["game"])
    if(games["game"].gamedata) {
        resp.json(games["game"][gamedata]);
    }
    else {
        resp.status(404).send("Game not found");
    }
    */
});


fetch("http://localhost:8090/game/:gamedata")
  .then(function (response) {
    return response.text();
  })
  .then(function (text) {
    //console.log(text);
  });


/*
let testdatabase = 
{

    "games": 
    {
        "gamename": 
        [
            {
                date: "2003-01-20",
                picture: "base64pic"
            },
            {
                date: "200-04-10",
                picture: "base64pic2"
            }
        ],
        "different gamename":
        [
            {
                date: "2013-11-22",
                picture: "base64pic"
            },
            {
                date: "200-04-10",
                picture: "base64pic2"
            }
        ]
        
    }
}
*/

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});


module.exports = app;

