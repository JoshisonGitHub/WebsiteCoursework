const express = require('express');
const app = express();

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
        games['Game Number ' + num] = { gamedata: [{ gamename, platform_played_on: [platform] }], postdata: [{ key: gamename, date, picture }] };
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
    // console.log("/games")
    // console.log(newname);
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
    // console.log("/gamedata");
    // console.log(newgamedata);
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
    // console.log("/postdata");
    // console.log(newgamedata);
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
fetch('http://localhost:8090/game/:postdata')
  .then(function (response) {
    return response.text();
  })
  .then(function (text) {
    // console.log(text);
  });
*/
/*
app.listen(port, () => {
    console.log(`server running on port ${port}`);
});
*/
module.exports = app;
