import {createTransport} from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
export const Transport = createTransport({
    service: 'gmail',
    port:587,
    auth:{
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD
    }
})
