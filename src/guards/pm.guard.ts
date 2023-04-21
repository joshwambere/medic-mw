import {NextFunction, Response} from "express";
import {HttpException} from "@exceptions/HttpException";
import {verify} from 'jsonwebtoken';
import{SECRET_KEY} from "@config";

import {roleEnum} from "@/enums/role.enum";


const authGuard = async (req: any, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.token;
        if (!token) {
             new HttpException(401, 'Unauthorized');
        }
        const decoded = (await verify(token, SECRET_KEY)) as any;

    
      
        next();
    } catch (error) {
        next(new HttpException(401, error.message));
    }
}


export  {authGuard};
