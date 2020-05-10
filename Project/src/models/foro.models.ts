import mongoose, { Types } from "mongoose";
import { IComentario } from "../models/comentario.model";
import { IEstudiante } from "../models/estudiante.model";
import { IRate } from "../models/rate.model";

export interface IForo extends mongoose.Document{
    Title: String;
    Description: String;
    date: string;
    like: string;
    RateStart: IRate;
    Estudiante_id: IEstudiante;
    Comentario_id : IComentario;
    
}

const ForoSchema= new mongoose.Schema({
    Title: {type: String, required: true},
    Description: {type: String, required: true},
    date: {type: String, required: true},
    like: {type: String, required: true},
    RateStart: {type: String, required: true},
    Estudiante_id: {type: String, required: true},
    Comentario_id: {type: mongoose.Schema.Types.ObjectId, ref: "Carrera", required: true},
    
});

export const Foro = mongoose.model<IForo>("Foro",ForoSchema);