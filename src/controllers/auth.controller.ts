import { NextFunction, Request, Response } from 'express';
import AuthService from '@services/auth.service';


class AuthController {
    public authService = new AuthService();
    public signUp = async (req: Request, res: Response, next: NextFunction) => {
        return ""
    };

    public verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
        return ""
    }

    public login = async (req: Request, res: Response, next: NextFunction) => {
       return ""
    }

    public logout = async (req: Request, res:Response, next: NextFunction)=>{
       return ""
    }

}


export default AuthController;
