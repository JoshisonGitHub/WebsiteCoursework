const express = require('express');
const app = express();

const hostname = '127.0.0.1';
const port = 5500;

//test code
let instruments = [ 'piano', 'concertina', 'double bass'];

app.get('/list', function (req, resp){
    resp.send(instruments);
});

app.listen(port, () => {
    console.log(`server running on port ${port}`);
    console.log(`Server running at http://${hostname}:${port}/`);
});