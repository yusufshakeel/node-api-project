const request = require('supertest');
const {User} = require('../../models/user');

let server;

describe('/api/users', () => {

    const testUser = {
        "first_name": "Test",
        "last_name": "User",
        "email": "testuser@example.com",
        "password": "root1234"
    };

    let users = null;

    let token_of_loggedin_user = null;

    beforeEach(() => {
        server = require('../../index');
    });

    afterEach(() => {
        server.close();
    });

    afterAll(async () => {
        await User.collection.deleteOne({ email: testUser.email });
    });

    describe('GET /', () => {
        
        it('should return all users (public data)', async () => {
            
            const res = await request(server).get('/api/users');

            expect(res.body.code).toBe(200);
            users = res.body.data;

        });

    });

    describe('GET /:id', () => {
        
        it('should return user (public data) by id', async () => {

            const url = '/api/users/' + users[0]._id;
            const res = await request(server).get(url);

            expect(res.body.code).toBe(200);
            expect(res.body.data._id).toBe(users[0]._id);

        });

    });

    describe('POST /', () => {

        it ('should return an error highlighting missing first_name', async () => {

            const res = await request(server)
                .post('/api/users')
                .send({});
            
            expect(res.body.status).toBe('error');
            expect(res.body.message).toMatch(/first_name/);

        });

        it ('should return an error highlighting missing email', async () => {

            const res = await request(server)
                .post('/api/users')
                .send({
                    first_name: testUser.first_name,
                    last_name: testUser.last_name
                });
            
            expect(res.body.status).toBe('error');
            expect(res.body.message).toMatch(/email/);

        });

        it ('should return an error highlighting missing password', async () => {

            const res = await request(server)
                .post('/api/users')
                .send({
                    first_name: testUser.first_name,
                    last_name: testUser.last_name,
                    email: testUser.email
                });
            
            expect(res.body.status).toBe('error');
            expect(res.body.message).toMatch(/password/);

        });

        it('should create a new user', async () => {

            const res = await request(server)
                .post('/api/users')
                .send(testUser);

            expect(res.body.status).toBe('success');
            expect(res.body.data.email).toBe(testUser.email);

        });

    });

    describe('POST /login', () => {

        it('should return error highlighting missing email', async () => {

            const res = await request(server)
                .post('/api/users/login')
                .send({});

            expect(res.body.status).toBe('error');
            expect(res.body.message).toMatch(/email/);

        });

        it('should return error highlighting missing password', async () => {

            const res = await request(server)
                .post('/api/users/login')
                .send({
                    email: testUser.email
                });

            expect(res.body.status).toBe('error');
            expect(res.body.message).toMatch(/password/);

        });

        it('should login the user', async () => {

            const res = await request(server)
                .post('/api/users/login')
                .send({
                    email: testUser.email,
                    password: testUser.password
                });

            expect(res.body.status).toBe('success');
            expect(res.body.data.email).toBe(testUser.email);

            token_of_loggedin_user = res.header['x-auth-token'];

        });

    });

    describe('PUT /', () => {

        it('should update first_name', async () => {

            const res = await request(server)
                .put('/api/users')
                .send({
                    first_name: testUser.first_name[0]
                })
                .set('x-auth-token', token_of_loggedin_user);

            expect(res.body.code).toBe(200);
            expect(res.body.data.first_name).toBe(testUser.first_name[0]);

        });

    });

    describe('DELETE /', () => {

        it('should delete user', async () => {

            const res = await request(server)
                .delete('/api/users')
                .set('x-auth-token', token_of_loggedin_user);

            expect(res.body.code).toBe(200);
            expect(res.body.data).toBe('Account deleted.');

        });

    });

});