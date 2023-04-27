import { NextFunction, Request, Response } from 'express';
import AuthService from '@services/auth.service';
import SendRequest from '@services/httpService';
import { BACKEND_URL } from '@config';

class AuthController {
    public authService = new AuthService();
    public signUp = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const info = {
                url: `${BACKEND_URL}/signup`,
                method: "POST",
                data: req.body,
                headers: "application/json"
            }
            const response = await SendRequest(info)
            res.status(201).send({ response: response.data });
        } catch (error) {
            res.status(error.status).send( error.data);
        }
    };


    public login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const info = {
                url: `${BACKEND_URL}/login`,
                method: "POST",
                data: req.body,
                headers: null
            }
            const response = await SendRequest(info)
            res.send({ response: response.data });
        } catch (error) {
            console.log(error);
            res.status(error.status).send(error.data);
        }
    }
}


export default AuthController;
