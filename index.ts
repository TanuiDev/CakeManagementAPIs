import dotenv from 'dotenv';
import assert from 'assert';
import sql from 'mssql';

dotenv.config()

const {
SQL_SERVER, SQL_USER, SQL_PWD, SQL_DB,SQL_ENCRYPT,PORT 
}=process.env;


const port=PORT 
assert(SQL_SERVER, 'SQL_SERVER is not set in environment variables');
assert(SQL_USER, 'SQL_USER is not set in environment variables');
assert(SQL_PWD, 'SQL_PWD is not set in environment variables');
assert(SQL_DB, 'SQL_DB is not set in environment variables');
assert(SQL_ENCRYPT, 'SQL_ENCRYPT is not set in environment variables');

export const config = {
    port:port,
    sqlConfig: {
        user: SQL_USER,
        password: SQL_PWD,
        database: SQL_DB,
        server: SQL_SERVER,
        
        pool: {
            max: 10,
            min: 0,
            idleTimeoutMillis: 30000
        },
        options: {
            encrypt:true, 
            trustServerCertificate: true 
        }
    }

};

export const getPool = async () => {
    try {
        const pool = await sql.connect(config.sqlConfig);
        return pool;
    } catch (error) {
        console.error('SQL Connection Error: ', error);
        throw error;        
    }
}