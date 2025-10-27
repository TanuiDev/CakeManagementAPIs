import { getPool } from "../db/config";

import sql from "mssql";


export const getAllStages = async () => {
  const pool = await getPool();
  const result = await pool.request().query('SELECT * FROM Cake_Stages');
  return result.recordset;
}


export const getOrderStages = async (orderId: number) => {
  const pool = await getPool();
  const result = await pool.request()
    .input('OrderId', sql.Int, orderId)
    .query('SELECT * FROM Cake_Stages WHERE OrderId = @OrderId');
  return result.recordset;
}

export const getStageById = async (Id: number) => {
  const pool = await getPool();
  const result = await pool.request()
    .input('Id',  Id)
    .query('SELECT * FROM Cake_Stages WHERE Id = @Id');
  return result.recordset[0];
}


export const updateStageStatus = async (Id: number, status: string) => {
  const pool = await getPool();

  const request = pool.request()
    .input('Id', Id)
    .input('Status', status)
    .input('UpdatedAt', new Date());

 
  if (status === 'In Progress') {
    request.input('StartedAt', new Date());
    await request.query('UPDATE Cake_Stages SET Status = @Status, StartedAt = @StartedAt, UpdatedAt = @UpdatedAt WHERE Id = @Id');
  } else if (status === 'Completed') {
    request.input('CompletedAt', new Date());
    await request.query('UPDATE Cake_Stages SET Status = @Status, CompletedAt = @CompletedAt, UpdatedAt = @UpdatedAt WHERE Id = @Id');
    
  } else {
    await request.query('UPDATE Cake_Stages SET Status = @Status, UpdatedAt = @UpdatedAt WHERE Id = @Id');  
  }
};

export const deleteStageById = async (Id: number) => {
  const pool = await getPool();
  await pool.request()
    .input('Id', Id)
    .query('DELETE FROM Cake_Stages WHERE Id = @Id');
};


export const markStageAsCompleted = async (Id: number) => {
  const pool = await getPool();
  await pool.request()
    .input('Id', Id)
    .input('Status', 'Completed')
    .input('CompletedAt', new Date())
    .query('UPDATE Cake_Stages SET Status = @Status, CompletedAt = @CompletedAt WHERE Id = @Id');
};

