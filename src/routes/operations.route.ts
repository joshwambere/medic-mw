import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import {authGuard} from "@/guards/pm.guard";
import ProjectController from "@/controllers/operations.controller";
import {InviteContributorDto, ProjectDto} from "@dtos/project.dto";

class ProjectRoute implements Routes {
    public path = '/project/';
    public router = Router();
    public projectController = new ProjectController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}pm/add`, validationMiddleware(InviteContributorDto, 'body'), this.projectController.invitePm);
        this.router.post(`${this.path}invite`, validationMiddleware(InviteContributorDto, 'body'), this.projectController.inviteContributor);
        

    }
}

export default ProjectRoute;
