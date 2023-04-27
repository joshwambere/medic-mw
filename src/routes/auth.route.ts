import { Router } from 'express';
import AuthController from '@controllers/auth.controller';
import { CreateUserDto, loginDto, resetPasswordDto, verifyUserDto } from '@dtos/user.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { authGuard } from "@/guards/permission.guard";

class AuthRoute implements Routes {
    public path = '/auth/';
    public router = Router();
    public authController = new AuthController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}signup`, this.authController.signUp);
        this.router.post(`${this.path}login`, this.authController.login)


    }
}

export default AuthRoute;
