import { NextFunction, Request, Response } from 'express';
import AuthService from '@services/auth.service';
import SendRequest from '@services/httpService';
import { BACKEND_URL, SECRET_KEY } from '@config';
import { verify } from 'jsonwebtoken';
import { TokenData } from '@/interfaces/user.interface';

class OperationController {
    public authService = new AuthService();
    public getPatients = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const info = {
                url: `${BACKEND_URL}/patients`,
                method: "GET",
                data: req.body,
                headers: "application/json"
            }
            const response = await SendRequest(info)
            res.status(201).send({ response: response.data });
        } catch (error) {
            res.status(error.status).send(error.data);
        }
    };


    public getPhysicians = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const info = {
                url: `${BACKEND_URL}/physicians`,
                method: "GET",
                data: req.body,
                headers: null
            }
            const response = await SendRequest(info)
            res.send({ response: response.data });
        } catch (error) {
            res.status(error.status).send(error.data);
        }
    }

    public getPharamcist = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const info = {
                url: `${BACKEND_URL}/pharmacist`,
                method: "GET",
                data: req.body,
                headers: null
            }
            const response = await SendRequest(info)
            res.send({ response: response.data });
        } catch (error) {
            res.status(error.status).send(error.data);
        }
    }

    public consultation = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const info = {
                url: `${BACKEND_URL}/physicians`,
                method: "POST",
                data: req.body,
                headers: { Autorization: req.headers.authorization }
            }
            const response = await SendRequest(info)
            res.send({ response: response.data });
        } catch (error) {
            res.status(error.status).send(error.data);
        }
    }

    public getConsultations = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const decoded = (await verify(req.headers.authorization, SECRET_KEY)) as TokenData;
            const id = decoded.jti
            const info = {
                url: `${BACKEND_URL}/consultation`,
                method: "POST",
                data: {id},
                headers: { Autorization: req.headers.authorization }
            }
            
            const response = await SendRequest(info)
            res.send({ response: response.data });
        } catch (error) {
            res.status(error.status).send(error.data);
        }
    }

    public grantPermission = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const info = {
                url: `${BACKEND_URL}/patients`,
                method: "POST",
                data: req.body,
                headers: { Authorization: req.headers.authorization }
            }

            const response = await SendRequest(info)
        
            res.send({ response: response.data });
        } catch (error) {
            res.status(error.status).send(error.data);
        }
    }

    public prescribe = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const info = {
                url: `${BACKEND_URL}/pharmacist`,
                method: "POST",
                data: req.body,
                headers: req.headers
            }
            const response = await SendRequest(info)
            res.send({ response: response.data });
        } catch (error) {
            res.status(error.status).send(error.data);
        }
    }
}


export default OperationController;
