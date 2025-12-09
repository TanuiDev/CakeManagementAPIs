
import  request  from "supertest";

import app from "../../src/index";

import { getPool } from "../../src/db/config";

 let pool:any;
 let testStageId:number;

beforeAll(async () => {
    pool = await getPool();

    const result = await pool.query("INSERT INTO Cake_Stages ( OrderId, StageName, Status, UpdatedAt) OUTPUT INSERTED.Id VALUES (2007, 'Baking', 'In Progress', '2023-12-01 10:00:00')");
    testStageId = result.recordset[0].Id;
});

afterAll(async () => {
   await  pool.query(`DELETE FROM Cake_Stages WHERE Id = ${testStageId}`);
    await pool.close();
});

describe('Stages Controller Integration Tests', () => {

    it.skip('should create a new stage', async () => {
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
        const response =  await request(app).get('/stages/order/1006');
        expect(response.statusCode).toBe(200);
    })

    it("Should fetch stage details by StageId",async ()=>{
        const response =  await request(app).get(`/stages/${testStageId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('Id', testStageId);
    });

    it("Should update stage by StageId",async ()=>{
        const response =  await request(app).patch(`/stages/${testStageId}`).send({
            StageName: 'Baking',
            Status: 'Completed',
            UpdatedAt: '2023-12-01 15:00:00'
        });
        expect(response.statusCode).toBe(200);
    });

    it("Should complete stage by StageId",async ()=>{
        const response =  await request(app).post(`/stages/${testStageId}/complete`);
        expect(response.statusCode).toBe(200);
    });
    it("Should delete stage by StageId",async ()=>{
        const response =  await request(app).delete(`/stages/${testStageId}`);
        expect(response.statusCode).toBe(200);
    });
    
    it("Should return 404 for non-existing StageId",async ()=>{
        const response =  await request(app).get('/stages/9999');
        expect(response.statusCode).toBe(404);
    });
    

});