import { NextFunction, Request, Response } from 'express';
import AuthService from '@services/auth.service';
import SendRequest from '@services/httpService';
import { BACKEND_URL } from '@config';

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
                headers: req.headers
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
                headers: req.headers
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
