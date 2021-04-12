const request = require("supertest"); // Import supertest
const app = require("../index"); // Import app
const { user, transaksi } = require("../models"); // Import user and transaksi models

// Delete all data in user and transaksi
beforeAll(async () => {
  await Promise.all([user.deleteMany(), transaksi.deleteMany()]);
});

//TODO: Test the auth
describe("Auth Test", () => {
  
  //TODO: Sign Up Test
  describe("/auth/signup POST", () => {
    it("It should create a user and return the token", async () => {
      const res = await request(app).post("/auth/signup").send({
        email: "darwin@esmondtech.com",
        password: "12345678Pw_",
        confirmPassword: "12345678Pw_",
        name: "Darwin K",
      });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toEqual("Success");
      expect(res.body).toHaveProperty("token");
    });

    //! Test The error
    it("It should error when create a user", async () => {
      const res = await request(app).post("/auth/signup").send({
        email: "darwin@esmondtech.com",
        password: "12345678Pw_",
        confirmPassword: "12345678Pw_",
        name: "Darwin K",
      });
      expect(res.statusCode).toEqual(401);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toEqual("User can't be created");
    });
  });

  //TODO: Sign Up Test
  describe("/auth/signin POST", () => {
    it("It should return the token", async () => {
      const res = await request(app).post("/auth/signin").send({
        email: "darwin@esmondtech.com",
        password: "12345678Pw_",
      });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toEqual("Success");
      expect(res.body).toHaveProperty("token");
    });
  });
});
