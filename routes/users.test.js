const request = require('supertest');
const app = require('./users');
const bcrypt = require('bcrypt');
const { User, validate } = require('./../models/user');


describe('users endpoints', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  //----------------signup/user registration testcases------------------
  test("POST / : signup with existing email id and password", async () => {
    let mockUser = {
      _id: "1",
      email: 'eli@gmail.com',
      password: 'password123456&',
    }

    const mock = jest.spyOn(User, 'findOne');
    mock.mockReturnValue(mockUser);
    mock();
    const reqUser = {
      email: 'eli@gmail.com',
      password: 'password123456&'
    }
    const response = await request(app)
      .post("/")
      .send(reqUser)
      .set("Content-Type", "application/json")
    expect(response.statusCode).toBe(400)
    expect(response.error.text).toBe('That user already exists');
  });

  test("POST / : signup with existing email id and wrong password", async () => {
    let mockUser = {
      _id: "1",
      email: 'eli@gmail.com',
      password: 'pass',
    }

    const mock = jest.spyOn(User, 'findOne');
    mock.mockReturnValue(mockUser);
    mock();
    const reqUser = {
      email: 'eli@gmail.com',
      password: 'pass'
    }
    const response = await request(app)
      .post("/")
      .send(reqUser)
      .set("Content-Type", "application/json")
    expect(response.statusCode).toBe(400)
    expect(response.error.text).toBe('"password" length must be at least 5 characters long');
  });

  test("POST / : signup with incorrect email id and correct password", async () => {
    let mockUser = {
      email: 'eli@gmail.com@gmail.com',
      password: 'passw',
    }

    const mock = jest.spyOn(User, 'findOne');
    mock.mockReturnValue(mockUser);
    mock();
    const reqUser = {
      email: 'eli@gmail.@gmailcom.com',
      password: 'passw'
    }
    const response = await request(app)
      .post("/")
      .send(reqUser)
      .set("Content-Type", "application/json")
    expect(response.statusCode).toBe(400)
    expect(response.error.text).toBe("\"email\" must be a valid email");
  });

  test("POST / : signup with new email and password", async () => {
    let mockUser = undefined

    const mock = jest.spyOn(User, 'findOne');
    mock.mockReturnValue(mockUser);
    mock();
    const reqUser = {
      email: 'eli@gmail.com',
      password: 'password123456&'
    }
    jest.spyOn(User.prototype, 'save').mockImplementationOnce(() => Promise.resolve());
    const response = await request(app)
      .post("/")
      .send(reqUser)
      .set("Content-Type", "application/json")
    expect(response.statusCode).toBe(200)
  });

  //----------------signin/user login testcases------------------
  test("POST /signin : signin with existing email id and password", async () => {
    let mockUser = {
      _id: "1",
      email: 'eli@gmail.com',
      password: 'password123456&',
    }
    const salt = await bcrypt.genSalt(10);
    mockUser.password = await bcrypt.hash(mockUser.password, salt);

    const mock = jest.spyOn(User, 'findOne');
    mock.mockReturnValue(mockUser);
    mock();

    const reqUser = {
      email: 'eli@gmail.com',
      password: 'password123456&'
    }
    const response = await request(app)
      .post("/signin")
      .send(reqUser)
      .set("Content-Type", "application/json")
    expect(response.statusCode).toBe(201)
    expect(response.text).toBe('Successfully logged In');
  });

  test("POST /signin : signin with wrong password and correct mail", async () => {
    let mockUser = {
      _id: "1",
      email: 'eli@gmail.com',
      password: 'password123456&',
    }

    const mock = jest.spyOn(User, 'findOne');
    mock.mockReturnValue(mockUser);
    mock();

    const reqUser = {
      email: 'eli@gmail.com',
      password: 'password123456&'
    }
    const response = await request(app)
      .post("/signin")
      .send(reqUser)
      .set("Content-Type", "application/json")
    expect(response.statusCode).toBe(400)
    expect(response.error.text).toBe('Incorrect password.');
  });

  test("POST /signin : signin with wrong email address", async () => {
    let mockUser = undefined;

    const mock = jest.spyOn(User, 'findOne');
    mock.mockReturnValue(mockUser);
    mock();

    const reqUser = {
      email: 'eli@gmail.com',
      password: 'password123456&'
    }
    const response = await request(app)
      .post("/signin")
      .send(reqUser)
      .set("Content-Type", "application/json")
    expect(response.statusCode).toBe(400)
    expect(response.error.text).toBe('Usernot exist! Signup now');
  });
})