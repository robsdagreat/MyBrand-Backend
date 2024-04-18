import { Request, Response, NextFunction } from "express";
import jwt, {JwtPayload} from 'jsonwebtoken';
import { jwtSecretKey } from "../utils.js";


const isAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void>=>{
    try{const token = req.headers.authorization?.split(' ')[1];

    if(!token){
        res.status(401).json({message: 'Unauthorized. Token missing!'});
        return;
    }

    let decoded: JwtPayload;
    
    if(typeof token === 'string'){
        decoded = jwt.verify(token, jwtSecretKey) as JwtPayload;
    } else{
        throw new Error ("Invalid token type");
    }

    if(decoded && decoded.isAdmin){
        next();
    }else{
        res.status(403).json({message: 'Restricted! Not authorized as admin.'});
    }

    } catch(error){
        console.error(error);
        res.status(500).json({message: 'Server Error'});
    }
}

export default isAdmin;