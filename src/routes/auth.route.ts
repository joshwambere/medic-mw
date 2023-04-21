import { Router } from 'express';
import AuthController from '@controllers/auth.controller';
import {CreateUserDto, loginDto, resetPasswordDto, verifyUserDto} from '@dtos/user.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import {authGuard} from "@/guards/pm.guard";

class AuthRoute implements Routes {
    public path = '/auth/';
    public router = Router();
    public authController = new AuthController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}signup`, validationMiddleware(CreateUserDto, 'body'), this.authController.signUp);
        this.router.post(`${this.path}verify`, validationMiddleware(verifyUserDto, 'body'), this.authController.verifyEmail)
        this.router.post(`${this.path}login`, validationMiddleware(loginDto, 'body'), this.authController.login)
        this.router.get(`${this.path}logout`, this.authController.logout)
    
    }
}

export default AuthRoute;