const request = require('supertest');
const app = require('../../app');
const { mongoConnect, mongoDisconnect } = require('../../services/mongo');


describe ('Launches API', () => {
    
    beforeAll( async () => {
        await mongoConnect();
    });

    afterAll( async () => {
        await mongoDisconnect();
    });

    describe('Test GET /launches', () => {
        test('It should respond with 200 success', async () => {
            const response = await request(app)
                .get('/launches')
                .expect('Content-Type', /json/)
                .expect(200);
            
        });
    });
    
    describe('Test POST /launch', () => {
        const completeLaunchData = {
            mission: 'Test Mission',
            rocket: 'Test Rocket',
            target: 'Test Target',
            launchDate: 'Jan 4, 2029'
        };
    
        const launchDataWithOutDate = {
            mission: 'Test Mission',
            rocket: 'Test Rocket',
            target: 'Test Target',
        };
    
        const launchDataWithInvalidDate = {
            mission: 'Test Mission',
            rocket: 'Test Rocket',
            target: 'Test Target',
            launchDate: 'abebe',
        };
    
        test('It should respond with 201 created', async () =>{
            const response = await request(app)
                .post('/launches')
                .send(completeLaunchData)
                .expect('Content-Type', /json/)
                .expect(201);
    
            const requestDate = new Date(completeLaunchData.launchDate).valueOf();
            const responseDate = new Date(response.body.launchDate).valueOf();
    
            expect(responseDate).toBe(requestDate);
            expect(response.body).toMatchObject(launchDataWithOutDate);
        });
        test('It should catch missing required properties', async () =>{
            const response = await request(app)
                .post('/launches')
                .send(launchDataWithOutDate)
                .expect('Content-Type', /json/)
                .expect(400);
    
            expect(response.body).toStrictEqual({
                error: 'Missing launch property',
            });
        });
        test('It should catch invalid dates', async () =>{
            const response = await request(app)
                .post('/launches')
                .send(launchDataWithInvalidDate)
                .expect('Content-Type', /json/)
                .expect(400);
            
            expect(response.body).toStrictEqual({
                error: 'Invalid launch date',
            });
        });
    });

});

