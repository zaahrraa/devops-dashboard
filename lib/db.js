// lib/db.js
import { Pool } from 'pg';
import { getDbPassword } from './secret';

let pool = null;

export async function getDbPool() {
  if (!pool) {
    try {
      const password = await getDbPassword();
      
      if (!password) {
        throw new Error('Failed to fetch password from Secrets Manager');
      }

      pool = new Pool({
        user: process.env.DB_USER || 'devops',
        host: process.env.DB_HOST || '172.17.0.2',
        database: process.env.DB_NAME || 'devops_dashboard',
        password: password,
        port: parseInt(process.env.DB_PORT || '5432'),
        ssl: false,  // Floci doesn't use SSL
      });

      console.log('✅ Database connection pool created successfully');
    } catch (error) {
      console.error('❌ Failed to create database pool:', error);
      throw error;
    }
  }
  return pool;
}