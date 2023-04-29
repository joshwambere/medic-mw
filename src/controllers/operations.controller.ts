import { NextFunction, Request, Response } from 'express';
import SendRequest from '@services/httpService';
import { BACKEND_URL, SECRET_KEY } from '@config';
import { verify } from 'jsonwebtoken';
import { TokenData } from '@/interfaces/user.interface';
import fs from "fs";
import CSV from "fast-csv";

class OperationController {
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

    public getConsultationsWithId = async (req: Request, res: Response, next: NextFunction) => {
        try {
            
            const id = req.body.id
            const info = {
                url: `${BACKEND_URL}/consultation`,
                method: "POST",
                data: { id },
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

    public getMedicine = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const info = {
                url: `${BACKEND_URL}/medicine`,
                method: "GET",
                data: req.body,
                headers: { Authorization: req.headers.authorization }
            }

            const response = await SendRequest(info)

            res.send({ response: response.data });
        } catch (error) {
            res.status(error.status).send(error.data);
        }
    }

    public uploadMedicine = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const info = {
                url: `${BACKEND_URL}/medicine`,
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


    public downloadMedicine = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const info = {
                url: `${BACKEND_URL}/consultation`,
                method: "POST",
                data: req.body,
                headers: { Authorization: req.headers.authorization },
            };

            const response = await SendRequest(info);
            const medicalRecords = response.data;

            if (!medicalRecords.payload[0]?.medicines || medicalRecords.payload[0]?.medicines.length === 0) {
                return res.status(404).json({ error: "No medical records found" });
            }

            const csvData = [];
            csvData.push(["medName", "medPrice", "medExpiration"]);

            medicalRecords.payload[0].medicines.forEach((record) => {
                const row = [];
                row.push(record.medName);
                row.push(record.medPrice);
                row.push(record.medExpiration);
                csvData.push(row);
            });

            const fileName = "subscriptions.csv";
            const filePath = `./${fileName}`;

            fs.writeFile(filePath, "", () => { });

            csvData.forEach((record) => {
                fs.appendFile(filePath, `${record.join(",")}\n`, () => { });
            });

            res.set({
                "Content-Disposition": `attachment; filename=${fileName}`,
                "Content-Type": "text/csv",
            });

            fs.createReadStream(filePath).pipe(res);
        } catch (error) {
            console.log(error);
            res.status(500).send(error.data);
        }
    };







}


export default OperationController;
