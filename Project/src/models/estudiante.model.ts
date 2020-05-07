import mongoose, { Types } from "mongoose";
import { ICarrera } from "../models/carrera.model";

export interface IEstudiante extends mongoose.Document{
    NickName: String;
    Name: String;
    LastName: string;
    Email: string;
    Password: string;
    AccountNumber: number;  
    Rol: string;
    Carrera1 : ICarrera;
    Carrera2 : ICarrera;
}

const EstudianteSchema= new mongoose.Schema({
    NickName: {type: String, required: true},
    Name: {type: String, required: true},
    LastName: {type: String, required: true},
    Email: {type: String, required: true},
    Password: {type: String, required: true},
    AccountNumber: {type: String, required: true},
    Rol: {type: String, required: true},
    Carrera1: {type: mongoose.Schema.Types.ObjectId, ref: "Carrera", required: true},
    Carrera2: {type: mongoose.Schema.Types.ObjectId, ref: "Carrera", required: false}
});

export const Estudiante = mongoose.model<IEstudiante>("Estudiante",EstudianteSchema);