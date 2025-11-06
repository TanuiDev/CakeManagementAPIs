
import  request  from "supertest";

import app from "../../src/index";

import { getPool } from "../../src/db/config";

 let pool:any;

beforeAll(async () => {
    pool = await getPool();
    await pool.query("INSERT INTO Cake_Stages ( OrderId, StageName, Status, UpdatedAt) VALUES (1, 'Baking', 'In Progress', '2023-12-01 10:00:00')");

});

afterAll(async () => {
   await  pool.query("DELETE FROM Cake_Stages WHERE OrderId=1006");
    await pool.close();
});

describe('Stages Controller Integration Tests', () => {

    it('should create a new stage', async () => {
        const response = await request(app).post('/stages').send({
            OrderId: 3,
            StageName: 'Frosting',
            Status: 'Pending',
            UpdatedAt: '2023-12-02 12:00:00'
        });
        expect(response.status).toBe(201);
    });

    it("Should fetch all the stages",async ()=>{
        const response =  await request(app).get('/stages');
        expect(response.statusCode).toBe(200);
    })

    it("Should fetch stage by OrderId",async ()=>{
        const response =  await request(app).get('/stages/order/1');
        expect(response.statusCode).toBe(200);
    })

    it("Should fetch stage details by StageId",async ()=>{
        const response =  await request(app).get('/stages/10');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('Id', 10);
    });

    it("Should update stage by StageId",async ()=>{
        const response =  await request(app).patch('/stages/8').send({
            StageName: 'Baking',
            Status: 'Completed',
            UpdatedAt: '2023-12-01 15:00:00'
        });
        expect(response.statusCode).toBe(200);
    });

    it("Should complete stage by StageId",async ()=>{
        const response =  await request(app).post('/stages/6/complete');
        expect(response.statusCode).toBe(200);
    });
    it.skip("Should delete stage by StageId",async ()=>{
        const response =  await request(app).delete('/stages/9');
        expect(response.statusCode).toBe(200);
    });
    
    it("Should return 404 for non-existing StageId",async ()=>{
        const response =  await request(app).get('/stages/9999');
        expect(response.statusCode).toBe(404);
    });
    

});