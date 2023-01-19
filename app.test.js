/* eslint-disable no-undef */

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

    test('GET /games includes meatboy', () => {
        return request(app)
	    .get('/games')
	    .expect(/meatboy/);
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

    test('GET /game/:gamedata includes meatboy', () => {
        return request(app)
	    .get('/game/:gamedata')
	    .expect(/meatboy/);
    });
    
    test('GET /game/:gamedata includes 2023-01-18', () => {
        return request(app)
	    .get('/game/:gamedata')
	    .expect(/meatboy/);
    });

    test('GET /game/:gamedata includes https://www.nationalreview.com/wp-content/uploads/2021/01/super-meatboy-forever-cutscene.jpg?fit=2057%2C1200', () => {
        return request(app)
	    .get('/game/:gamedata')
	    .expect(/meatboy/);
    });

    test('POST /game/new', () => {
        const params = { gamename: 'Jest Test', date: '2023-01-18', picture: 'https://miro.medium.com/max/300/1*veOyRtKTPeoqC_VlWNUc5Q.png' };
        return request(app)
        .post('/game/new')
        .send(params)
	    .expect(200);
    });
    
});