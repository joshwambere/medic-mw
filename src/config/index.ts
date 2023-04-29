import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';

export const BACKEND_URL = "http://medic-be:8080/JavaServlet"
export const FRONTEND_URL = "http://localhost:3000"
export const NODE_ENV = "devlopment";
export const SECRET_KEY = "0123456789012345678901234567890123456789012345678901234567890123";