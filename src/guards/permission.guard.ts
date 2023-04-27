import {NextFunction, Response} from "express";
import {HttpException} from "@exceptions/HttpException";
import { verify } from 'jsonwebtoken';
import { SECRET_KEY } from "@config";
import { TokenData } from "@interfaces/user.interface";

const authGuard = async (req: any, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization;
        const decoded = (await verify(token, SECRET_KEY)) as TokenData;
        if (!token) {
            next(new HttpException(401, "Unauthorized"));
        }
        next();
    } catch (error) {
        next(new HttpException(401, error.message));
    }
}

const patientGuard = async (req: any, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization;

        if (token) {
            const decoded = (await verify(token, SECRET_KEY)) as TokenData;
        
            if (decoded.role!="PATIENT") {
                next(new HttpException(403, 'Forbidden resources'));
            } else {
                next();
            }

        } else {
            next(new HttpException(401, 'Please login first'));
        }


    } catch (error) {
        if (error.message === 'jwt expired') {
            next(new HttpException(401, 'Please login first'));
        }
        next(new HttpException(401, error.message));
    }
}

const physicianGuard = async (req: any, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization;

        if (token) {
            const decoded = (await verify(token, SECRET_KEY)) as TokenData;

            if (decoded.role != "PHYSICIAN") {
                next(new HttpException(403, 'Forbidden resources'));
            } else {
                next();
            }

        } else {
            next(new HttpException(401, 'Please login first'));
        }


    } catch (error) {
        if (error.message === 'jwt expired') {
            next(new HttpException(401, 'Please login first'));
        }
        next(new HttpException(401, error.message));
    }
}

const pharmacistGuard = async (req: any, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization;

        if (token) {
            const decoded = (await verify(token, SECRET_KEY)) as TokenData;

            if (decoded.role != "PHARMACIST") {
                next(new HttpException(403, 'Forbidden resources'));
            } else {
                next();
            }

        } else {
            next(new HttpException(401, 'Please login first'));
        }


    } catch (error) {
        if (error.message === 'jwt expired') {
            next(new HttpException(401, 'Please login first'));
        }
        next(new HttpException(401, error.message));
    }
}





export { authGuard, patientGuard, physicianGuard, pharmacistGuard };
