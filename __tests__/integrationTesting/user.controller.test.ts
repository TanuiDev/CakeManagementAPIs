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
            email: "tanui@gmailmail.com",
            phone: "0799999999",
            password: "securePass123",
        };

        const res = await request(app).post("/users").send(newUser);
        expect(res.status).toBe(201);
        expect(res.body.message).toMatch(/user created successfully/i);
    });
});
