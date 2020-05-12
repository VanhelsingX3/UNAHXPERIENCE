import mongoose from "mongoose";
import { IComentario } from "../models/comentario.model";
import { IRate } from "../models/rate.model";

export interface IForo extends mongoose.Document{
    Title: String;
    Description: String;
    date: string;
    like: number;
    RateStart: IRate;
    Comentario_id : [IComentario];   
}
const ForoSchema= new mongoose.Schema({
    Title: {type: String, required: true},
    Description: {type: String, required: true},
    date: {type: String, required: true},
    like: {type: Number, required: true},
    RateStart: {type: String, required: true},
    Comentario_id: [{type: mongoose.Schema.Types.Mixed, ref: "Comentario", required: true}],
    
});

export const Foro = mongoose.model<IForo>("Foro",ForoSchema);