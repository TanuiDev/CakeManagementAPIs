import request from "supertest";
import app from "../../src/index";
import { getPool } from "../../src/db/config";

let pool: any;
let testDesignId: number;

beforeAll(async () => {
  pool = await getPool();

  const result = await pool
    .request()
    .query(`
      INSERT INTO Cake_Designs (designName, description, baseFlavor, availability, size, imageUrl, category)
      OUTPUT INSERTED.designId
      VALUES ('Test Design', 'A simple test design', 'Chocolate', 1, 'Medium', 'test.jpg', 'Birthday')
    `);

  testDesignId = result.recordset[0].designId;
});

afterAll(async () => {
  // Clean up test data
  await pool.request().query(`
    DELETE FROM Cake_Designs 
    WHERE designName IN ('Test Design', 'New Design', 'Delete Me')
  `);
  await pool.close();
});
          

 it("should create a new design", async () => {
    const response = await request(app).post("/designs").send({
      DesignName: "New Design",
      Description: "Newly added design for testing",
      BaseFlavor: "Vanilla",
      BasePrice: 29999,
      Availability: 1,
      Size: "Large",
      ImageUrl: "newdesign.jpg",
      Category: "Wedding",
    });

    expect(response.statusCode).toBe(201);    
  });

describe("Cake Designs Controller Integration Tests", () => {
  it("should retrieve all designs", async () => {
    const response = await request(app).get("/designs");
    expect(response.statusCode).toBe(200);
    
  });

  it("should retrieve a design by ID", async () => {
    const response = await request(app).get(`/designs/${testDesignId}`);
    expect(response.statusCode).toBe(200);
  
  });

  it("should return 404 for a non-existing design", async () => {
    const response = await request(app).get("/designs/999999");
    expect(response.statusCode).toBe(404);
  });

 

  it("should update an existing design", async () => {
    const response = await request(app).put(`/designs/${testDesignId}`).send({
      designName: "Updated Test Design",      
    });

    expect(response.statusCode).toBe(200);   
  });

  it("should delete an existing design", async () => {
    // Insert a temporary design to delete
    const result = await pool.request().query(`
      INSERT INTO Cake_Designs (designName, description, baseFlavor, availability, size, imageUrl, category)
      OUTPUT INSERTED.designId
      VALUES ('Delete Me', 'Temp design', 'Vanilla', 1, 'Small', 'temp.jpg', 'Test')
    `);

    const deleteId = result.recordset[0].designId;

    const response = await request(app).delete(`/designs/${deleteId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "Cake design deleted successfully"
    );
  });

  it("should return 404 when deleting a non-existing design", async () => {
    const response = await request(app).delete("/designs/9999999");
    expect(response.statusCode).toBe(404);
  });
});
