import express from 'express';
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from 'swagger-ui-express';
import { NODE_ENV } from '@config';
import { Routes } from '@interfaces/routes.interface';
import cors from 'cors';
import cookieParser from "cookie-parser";
import errorMiddleware from "@middlewares/error.middleware";

import path from "path";


class App {
    public app: express.Application;
    public port: string | number;
    public env: string;
    public staticPath = path
   

    constructor(routes: Routes[]) {
        this.app = express();
        this.env = NODE_ENV || 'development';
        this.port = 5050;

        this.initializeMiddlewares()
        this.initializeRoutes(routes);
        this.initializeSwagger();
        this.initializeErrorHandling()
    }
    public listen() {
        this.app.listen(this.port, () => {
            console.info(`=================================`);
            console.info(`======= ENV: ${this.env} =======`);
            console.info(`🚀 App listening on the port ${this.port}`);
            console.info(`=================================`);
        });
    }


    private initializeRoutes(routes: Routes[]) {
        routes.forEach(route => {
            this.app.use('/', route.router);
        });
    }
    private initializeMiddlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cookieParser());
    }
    private initializeErrorHandling() {
        this.app.use(errorMiddleware);
    }
    private initializeSwagger() {
        const options = {
            swaggerDefinition: {
                info: {
                    title: 'REST API',
                    version: '1.0.0',
                    description: 'Medic Middleware docs',
                }
            },
            apis: ['swagger.yaml'],
        };

        const specs = swaggerJSDoc(options);
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, { enableCors: false }));
    }


}

export default App;
