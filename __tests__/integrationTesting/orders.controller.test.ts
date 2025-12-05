import  request  from "supertest";

import app from "../../src/index";

import { getPool } from "../../src/db/config";

let pool:any;
let testOrderId: number;

beforeAll(async () => {
  pool = await getPool();

  const result = await pool.query(`
    INSERT INTO Cake_Orders
      (UserId, Size, Flavor, Message, Status, DeliveryDate, Notes, ExtendedDescription, SampleImages, ColorPreferences)
    OUTPUT INSERTED.Id
    VALUES
      (9999, 'Medium', 'Vanilla', 'Happy Birthday!', 'Pending', '2023-12-25',
       'No nuts, please.', 'Extra layers of chocolate', 'image1.jpg', 'Red, Blue')
  `);
  testOrderId = result.recordset[0].Id;  

  console.log(`Inserted test order with ID: ${testOrderId}`);
  
});

afterAll(async () => {
    const pool = await getPool();
  await pool.query("DELETE FROM Cake_Orders WHERE UserId= 9999");
  await pool.close();
});

describe("Orders Controller Integration Tests", () => {
    it("should create a new order", async () => {
        const response = await request(app).post("/orders").send({
                DesignId: 2,
                UserId: 9999,
                Size: "Medium",
                Flavor: "Vanilla",
                Message: "Happy Birthday!",
                Status: "Pending",
                DeliveryDate: "2023-12-25",
                Notes: "No nuts, please.",
                ExtendedDescription: "Extra layers of chocolate",
                SampleImages: "image1.jpg, image2.jpg",
                ColorPreferences: "Red, Blue"
            });

        expect(response.status).toBe(201);       
    });
    it("should retrieve all orders", async () => {
        const response = await request(app).get("/orders");

        expect(response.statusCode).toBe(200);       
    });
    
    it("should retrieve an order by ID", async () => {
        const response = await request(app).get(`/orders/${testOrderId}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("Id", testOrderId);
    });
     it("should update order status", async () => {
        const response = await request(app).patch(`/orders/${testOrderId}`).send({
            Status: "Pending"
        });
        expect(response.statusCode).toBe(200);
    });
    it("Should return 404 for non-existing order", async () => {
        const response = await request(app).get("/orders/122334234");
        expect(response.statusCode).toBe(404);
    });

    it("It should update the details of the order", async()=>{
        const response = await request(app).patch(`/orders/${testOrderId}`).send({
            Size: "Large",
            Flavor: "Chocolate",
            Message: "Congratulations!",
            ColorPreferences: "Red"
        });

        expect(response.statusCode).toBe(200);
        
    });
   
    

    it("Should return the orders for a specific user", async () => {
        const response = await request(app).get("/user/orders/9999");
        expect(response.statusCode).toBe(200);        
    });

    it("Should return 404 when deleting non-existing order", async () => {
        const response = await request(app).delete("/orders/9999999");
        expect(response.statusCode).toBe(404);
    });


    it("should delete an order", async () => {
        const response = await request(app).delete(`/orders/${testOrderId}`);

        expect(response.statusCode).toBe(200);
    });  


});