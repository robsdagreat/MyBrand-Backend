import crypto from 'crypto'
import bcrypt from 'bcrypt'

export const  generateJwtSecretKey = (length: number): string =>{
    return crypto.randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length);
}

const adminEmail= "rwibutsorobert12@gmail.com";
const adminPass = "Dreamb4rever";


export const jwtSecretKey = generateJwtSecretKey(16);   