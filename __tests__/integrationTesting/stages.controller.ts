
import  request  from "supertest";

import app from "../../src/index";

import { getPool } from "../../src/db/config";

 let pool:any;

beforeAll(async () => {
    pool = await getPool();
    await pool.query("INSERT INTO Cake_Stages ( OrderId, StageName, Status, UpdatedAt) VALUES (1006, 'Baking', 'In Progress', '2023-12-01 10:00:00')");

});

afterAll(async () => {
   await  pool.query("DELETE FROM Cake_Stages WHERE OrderId=1006");
    await pool.close();
});

describe('Stages Controller Integration Tests', () => {

    it('should create a new stage', async () => {
        const response = await request(app).post('/stages').send({
            OrderId: 1006,
            StageName: 'Frosting',
            Status: 'Pending',
            UpdatedAt: '2023-12-02 12:00:00'
        });
        expect(response.status).toBe(201);
    });

});