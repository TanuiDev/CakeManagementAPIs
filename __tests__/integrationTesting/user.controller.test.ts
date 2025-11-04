import request from "supertest";
import app from "../../src/index";
import { getPool } from "../../src/db/config";
import bcrypt from "bcryptjs";

let pool: any;

beforeAll(async () => {
  pool = await getPool();

  const hashedPassword = await bcrypt.hash("testpass123", 10);

  // Seed user for authentication
  await pool.request().query(`
  INSERT INTO Users (name, email, phone, password, role, is_verified)
  VALUES ('Testuser','testuser@testmail.com','0712345678','${hashedPassword}','user', 1)
`);

});

afterAll(async () => {
  // Clean up test users
  await pool.request().query("DELETE FROM Users WHERE email LIKE '%@testmail.com'");
  await pool.close();
});

describe("User API Integration Test Suite", () => {
  it("should authenticate a user and return a token", async () => {
    const res = await request(app)
      .post("/users/login") 
      .send({
        email: "testuser@testmail.com",
        password: "testpass123", 
      });

    
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
    expect(res.body.message).toMatch(/login successful/i);
    expect(res.body.user.email).toBe("testuser@testmail.com");
  });
   it("should fail with wrong password", async () => {
        const res = await request(app).post("/login").send({
            email: "lancematt46@gmail.com",
            password: "wrongpassword",
        });

        expect(res.statusCode).toBeGreaterThanOrEqual(400)
        
    });
       it("should fail with non-existent user on login", async () => {
        const res = await request(app).post("/users/login").send({
            email: "nonexistent@testmail.com",
            password: "testpass123",
        });

        expect(res.status).toBe(404);
        expect(res.body.error).toMatch(/user not found/i);
    });
     it("should fetch all users successfully", async () => {
        const res = await request(app).get("/users");
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it("should create a new user successfully", async () => {
        const newUser = {
            name: "brian Tanui",
            email: "briantanui371@testmail.com",
            phone: "0799999999",
            password: "securePass123",
            address:"address"
        };

        const res = await request(app).post("/users/register").send(newUser);

        expect(res.statusCode).toBe(201);
       
    });
    it("should fail to create a user with missing fieclds", async () => {
        const res = await request(app).post("/users/register").send({
            name: "Elizabeth",
        });
        expect(res.status).toBeGreaterThanOrEqual(400);
       expect(res.body).toHaveProperty("message");

    });
     it("should fail to create a user with duplicate email", async () => {
        const newUser = {
            name: "user",
            email: "testuser@testmail.com", 
            phone: "0700000000",
            password: "securePass123",
        };

        const res = await request(app).post("/users/register").send(newUser);
        expect(res.status).toBe(500);
        
    });
    it("should return user by ID", async () => {
  const inserted = await pool
    .request()
    .query(
      "INSERT INTO Users (name, email, phone, password, role) OUTPUT INSERTED.user_id VALUES ('John Smith', 'john@testmail.com', '0700000000', 'pass123', 'user')"
    );

  const user_id = inserted.recordset[0].user_id; 

  const res = await request(app).get(`/users/${user_id}`);

  expect(res.status).toBe(200);
  expect(res.body.email).toBe("john@testmail.com");
});
it("should return 404 if user not found", async () => {
        const res = await request(app).get("/users/99999999");
        expect(res.status).toBe(404);
        expect(res.body.message).toMatch(/user not found/i);
    });
     it.skip("should update a user successfully", async () => {
  const inserted = await pool.request().query(`
    INSERT INTO Users (name, email, phone, password, role, is_verified)
    OUTPUT INSERTED.user_id
    VALUES ('Updateme', 'update@testmail.com', '0790000000', 'pass789', 'user', 1)
  `);

  const userId = inserted.recordset[0].user_id;

  const res = await request(app)
    .put(`/users/${userId}`)
    .send({
      name: "Brian Tanui",
      email: "briantanui371@testmail.com",
      phone: "0700111222",
      password: "newpass123",
      role: "admin",
    });

  expect(res.status).toBe(200);
  expect(res.body.message).toMatch(/user updated successfully/i);
});
 it("should return 400 when updating with invalid ID", async () => {
    const res = await request(app).put("/users/abc").send({
        name: "BadId",
    });
    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/invalid user id/i);
});
    it("should return 404 when updating non-existent user", async () => {
        const res = await request(app).put("/users/999999").send({
            name: "Ghost",
        });
        expect(res.status).toBe(404);
        expect(res.body.message).toMatch(/user not found/i);
    });
    it("should delete a user successfully", async () => {
        const inserted = await pool
            .request()
            .query(
                "INSERT INTO Users (name, email, phone, password, role) OUTPUT INSERTED.user_id VALUES ('Alice Brown', 'alice@testmail.com', '0722222222', 'pass456', 'user')"
            );

        const user_id = inserted.recordset[0].user_id;
        console.log("want to see:", user_id);
        const res = await request(app).delete(`/users/${user_id}`);
        expect(res.status).toBe(200);
        expect(res.body.message).toMatch(/user deleted successfully/i);
    });
      it("should return 400 for invalid user ID on delete", async () => {
        const res = await request(app).delete("/users/abc");
        expect(res.status).toBe(400);
        expect(res.body.message).toMatch(/invalid user id/i);
    });
      it("should return 404 for non-existent user on delete", async () => {
        const res = await request(app).delete("/users/99999999");
        expect(res.status).toBe(404);
        expect(res.body.message).toMatch(/user not found/i);
    });
    it("should fail verifying without email or code", async () => {
        const res = await request(app).post("/users/verify").send({});
        expect(res.status).toBe(400);
        expect(res.body.message).toMatch(/email and code are required/i);
    });
      it("should fail verifying non-existent user", async () => {
       const res = await request(app).post("/users/verify").send({
            email: "noone@testmail.com",
            code: "123456",
        });
        expect(res.status).toBe(404);
    });
  })


