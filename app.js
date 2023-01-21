const express = require('express');
const app = express();
const port = 8090;

app.use(express.json());
const path = require('path');
app.use(express.static(path.join(__dirname, 'Front_End')));

app.get('/', (req, res) => {
    res.redirect('basepage.html');
});

const fs = require('fs');
// const { Server } = require('http');
const gdb = './gamedatabase.json';
const games = require(gdb);
// const game = {};

app.post('/game/new', function (req, resp) {
    const gamename = req.body.gamename;
    const date = req.body.date;
    const picture = req.body.picture;

    const platform = req.body.platform;
    // console.log(picture);

    let num = Object.keys(games).length + 1;
    // console.log(num);

    let gameExist = false;
    Object.keys(games).forEach(function (curkey) {
        if (games[curkey].gamedata[0].gamename === gamename) {
            // console.log(games[key].gamename);
            games[curkey].gamedata[0].platform_played_on.push(platform);
            Object.keys(games).forEach(function (name) {
                console.log(games[name].postdata[0].key);
                if (games[name].postdata[0].key === gamename) {
                    games[name].postdata.push({ key: gamename, date, picture });
                }
            });
            gameExist = true;
            num--;
        }
    });
    // console.log(gameExist)

    if (!gameExist) {
        games['Game Number ' + num] = { gamedata: [{gamename, platform_played_on: [platform]}], postdata: [{ key: gamename, date, picture }] };
    }

    fs.writeFileSync(gdb, JSON.stringify(games));
    resp.send(games);
});

app.get('/games', function (req, resp) {
    const newname = [];
    Object.keys(games).forEach(function (curkey) {
        
        newname.push(games[curkey].gamedata[0].gamename);
    });
    if (newname.length === 0) {
        resp.status(404).send('No Game in list');
    } else {
        resp.send(newname);
    }
    //console.log("/games")
    //console.log(newname);
});

app.get('/game/:gamedata', function (req, resp) {
    const newgamedata = [];
    Object.keys(games).forEach(function (curkey) {
        newgamedata.push(games[curkey].gamedata);
        
    });
    if (newgamedata.length === 0) {
        resp.status(404).send('No data in list');
    } else {
        resp.send(newgamedata);
    }
    //console.log("/gamedata");
    //console.log(newgamedata);
    
});

app.get('/postdata', function (req, resp) {
    const newgamedata = [];
    Object.keys(games).forEach(function (curkey) {
        newgamedata.push(games[curkey].postdata);
        
    });
    if (newgamedata.length === 0) {
        resp.status(404).send('No data in list');
    } else {
        resp.send(newgamedata);
    }
    //console.log("/postdata");
    //console.log(newgamedata);
    
});

/*
fetch('http://localhost:8090/games')
  .then(function (response) {
    return response.text();
  })
  .then(function (text) {
    console.log(text);
  });
*/
/*
app.get('/game/postdata', function (req, resp) {
    const curdata = [];
    console.log("did run");
    Object.keys(games).forEach(function (curkey) {
        curdata.push(games[curkey].postdata);
        console.log(games[curkey].postdata);
    });

    if (curdata.length === 0) {
        resp.status(404).send('Game not found');
    } else {
        resp.send(curdata);
    }
    console.log("/game/postdata")
    console.log(curdata);
   
});
*/
/*
fetch('http://localhost:8090/game/:postdata')
  .then(function (response) {
    return response.text();
  })
  .then(function (text) {
    // console.log(text);
  });
*/
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
/*
app.listen(port, () => {
    console.log(`server running on port ${port}`);
});

/*
try {
    app.listen(port, () => {
        console.log(`server running on port ${port}`);
    });
} catch (err) {

    console.log("stinky did not work")
    document.getElementById("demo").innerHTML = err.message;
}
*/

/*
var http = require("http");

     http.get({host: "basepage.html"}, function(res){
    if( res.statusCode == 200 )
   console.log("This site is up and running!");
 else
   console.log("This site might be down "+res.statusCode);
   });
*/

module.exports = app;
