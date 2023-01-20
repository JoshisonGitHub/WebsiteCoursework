'use strict';

const request = require('supertest');
const app = require('./app');

describe('Test the game service', () => {
    
    test('GET /games succeeds', () => {
        return request(app)
	    .get('/games')
	    .expect(200);
        
    });

    test('GET /games returns JSON', () => {
        return request(app)
	    .get('/games')
	    .expect('Content-type', /json/);
    });

    test('GET /games includes Super Meat Boy', () => {
        return request(app)
	    .get('/games')
	    .expect(/Super Meat Boy/);
    });

    test('GET /game/:gamedata succeeds', () => {
        return request(app)
	    .get('/game/:gamedata')
	    .expect(200);
    });

    test('GET /game/:gamedata returns JSON', () => {
        return request(app)
	    .get('/game/:gamedata')
	    .expect('Content-type', /json/);
    });

    test('GET /game/:gamedata includes Super Meat Boy', () => {
        return request(app)
	    .get('/game/:gamedata')
	    .expect(/Super Meat Boy/);
    });

    test('GET /game/:gamedata includes New Super Mario Bros DS', () => {
        return request(app)
	    .get('/game/:gamedata')
	    .expect(/Super Mario Bros DS/);
    });
    
    test('GET /game/:gamedata includes 2023-01-18', () => {
        return request(app)
	    .get('/game/:gamedata')
	    .expect(/2023-01-18/);
    });
    //must fix
    /*
    test('GET /game/:gamedata includes https://www.gamespot.com/a/uploads/original/1575/15759911/3780132-desktopscreenshot2020.12.22-10.12.38.37.png', () => {
        return request(app)
	    .get('/game/:gamedata')
	    .expect(/https://www.gamespot.com/a/uploads/original/1575/15759911/3780132-desktopscreenshot2020.12.22-10.12.38.37.png/);
    });
    */
    test('POST /game/new', () => {
        const params = { gamename: 'Jest Test', date: '2023-01-18', picture: 'https://miro.medium.com/max/300/1*veOyRtKTPeoqC_VlWNUc5Q.png' };
        return request(app)
        .post('/game/new')
        .send(params)
	    .expect(200);
    });

    test('POST /game/new', () => {
        const params = { gamename: 'Jest Test', date: '2023-01-18', picture: 'https://miro.medium.com/max/300/1*veOyRtKTPeoqC_VlWNUc5Q.png' };
        return request(app)
        .post('/game/new')
        .send(params)
	    .expect(200);
    });
    
   //done();
});