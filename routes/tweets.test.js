const request = require('supertest');
const { Tweets } = require('../models/tweets');
const app = require('./tweets');



describe('tweets endpoints', () => {
    afterEach(() => {
        jest.restoreAllMocks()
    })

    //----------------create tweet------------------
    test("POST / : create tweet", async () => {
        let mockUser = {
            _id: '1',
            username: 'Exchange LG',
            tweet: 'my New Tweet',
            image: "image.png",
            timeStamp: new Date(),
        }
        const mock = jest.spyOn(Tweets, 'create');
        mock.mockReturnValue(mockUser);
        mock();

        const reqUser = {
            username: 'Exchange LG',
            tweet: 'my New Tweet',
            image: "image.png",
            timeStamp: new Date(),
        }
        const response = await request(app)
            .post("/")
            .send(reqUser)
            .set("Content-Type", "application/json")
        expect(response.statusCode).toBe(201)
    });

     //----------------read tweet------------------
    test("POST /read : create tweet", async () => {
        let mockUser = {
            _id: '1',
            username: 'Exchange LG',
            tweet: 'my New Tweet',
            image: "image.png",
            timeStamp: new Date(),
        }
        const mock = jest.spyOn(Tweets, 'find');
        mock.mockReturnValue(mockUser);
        mock();

        const reqUser = {
            username: 'Exchange LG',
            tweet: 'my New Tweet',
            image: "image.png",
            timeStamp: new Date(),
        }
        const response = await request(app)
            .get("/read")
            .send(reqUser)
            .set("Content-Type", "application/json")
        expect(response.statusCode).toBe(201)
    });

     //----------------read tweet : no records with username------------------
     test("POST /read : create tweet", async () => {
        let mockUser = [];
        const mock = jest.spyOn(Tweets, 'find');
        mock.mockReturnValue(mockUser);
        mock();

        const reqUser = {
            username: 'Exchange LG',
            tweet: 'my New Tweet',
            image: "image.png",
            timeStamp: new Date(),
        }
        const response = await request(app)
            .get("/read")
            .send(reqUser)
            .set("Content-Type", "application/json")
        expect(response.statusCode).toBe(201)
        expect(response.text).toBe('no tweets found');
    });
})