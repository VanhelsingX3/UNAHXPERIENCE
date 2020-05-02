import mongoose from "mongoose";
import { ICarrera } from "../models/carrera.model";

export interface IEstudiante extends mongoose.Document{
    NickName: String;
    Name: String;
    LastName: string;
    Email: string;
    Password: string;
    AccountNumber: number;
    Rol: string;
    CarreraId: ICarrera;
}

const EstudianteSchema= new mongoose.Schema({
    NickName: {type: String, required: true},
    Name: {type: String, required: true},
    LasName: {type: String, required: true},
    Email: {type: String, required: true},
    Password: {type: String, required: true},
    AccountNumber: {type: String, required: true},
    Rol: {type: String, required: true},
    OCarrera: {type: mongoose.Schema.Types.ObjectId, ref: "Carrera"}
});

export const Estudiante = mongoose.model<IEstudiante>("Estudiantes",EstudianteSchema);