import { Request, Response } from "express";
import { Estudiante, IEstudiante } from "../models/estudiante.model";
import { MongooseDocument } from "mongoose";

var SimpleCrypto = require("simple-crypto-js").default;
var _secretKey = "some-unique-key";
var simpleCrypto = new SimpleCrypto(_secretKey);
import { getCarrera } from "../services/carrera.service";
import { Carrera, ICarrera } from "../models/carrera.model";

class EstudianteHelpers{

    GetEstudiante(id_est: string):Promise<IEstudiante>{        
        return new Promise<IEstudiante>( (resolve) => {
            Estudiante.findById(id_est,(err:Error,estudiante:IEstudiante)=>{
                if(err){
                    console.log(err);
                }
                resolve(estudiante);
            }); 
        });
    }
}

export class EstudianteService extends EstudianteHelpers{

    public getAll(req: Request, res: Response){
        Estudiante.aggregate([
            {
                "$lookup":{
                    from:"carreras",
                    localfield:"Carrera",
                    foreingField:"_id",
                    as: "carrera"
                }
            }
        ],(err: Error, data:any)=>{
            if(err){
                res.status(401).send(err);
            }else{
                res.status(200).json(data);
            }
        })
    }    



    public async nuevoEstudiante(req: Request, res: Response) {
        const OEstudiante= new Estudiante(req.body);
        const CarreraExiste1: any = await getCarrera(req.body.Carrera1);
        const CarreraExiste2: any = await getCarrera(req.body.Carrera2);
        console.log(req.body.Carreras);

        OEstudiante.Carrera1=CarreraExiste1
        OEstudiante.Carrera2=CarreraExiste2
        console.log(req.body.Carreras);
        if (CarreraExiste1 != null){
            await OEstudiante.save((err: Error, estudiante: IEstudiante)=>{
                if(err){
                    res.status(401).send(err);
                }
                res.status(200).json(Estudiante ?{"successed": true, "Estudiante": estudiante} : {"successed": false})
            });
    
        }else{
            res.status(200).json({successed:false});
        }
    
    }
/*     public GetProducto(req:Request,res:Response){
        Producto.findById(req.params.id).populate("proveedor").exec((err:Error,producto:IProducts)=>{
            if(err){
                res.status(401).json(err);
            }else{
                res.status(200).json(producto);
            }
            
        });
    } */
/*     public getAllEstudiantes(req:Request, res:Response){
      
        Estudiante.find({}).populate({ path: 'NombreCarrera', model: Carreras}).exec((err: Error, estudiantes: MongooseDocument)=> {
            if(err){
                res.status(401).send(err);
            }else{
                res.status(200).json(estudiantes);
            }
        });
    }  */
}