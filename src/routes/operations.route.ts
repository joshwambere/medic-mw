import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { authGuard, patientGuard, physicianGuard } from "@/guards/permission.guard";
import ProjectController from "@/controllers/operations.controller";

class ProjectRoute implements Routes {
    public path = '/ops/';
    public router = Router();
    public projectController = new ProjectController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}patient`, authGuard, this.projectController.getPatients);
        this.router.get(`${this.path}physician`, authGuard, this.projectController.getPhysicians);
        this.router.get(`${this.path}pharmacist`, patientGuard, this.projectController.getPharamcist);
        this.router.post(`${this.path}physician/consultation`, physicianGuard, this.projectController.consultation);
        this.router.post(`${this.path}patient/grantPermission`, patientGuard, this.projectController.grantPermission);
        this.router.post(`${this.path}pharamcist/prescribe`, physicianGuard, this.projectController.prescribe);
    }
}

export default ProjectRoute;
