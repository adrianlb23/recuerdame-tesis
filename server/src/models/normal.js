import { Schema, model } from 'mongoose';

export const PerfumeBaseSchema = new Schema(
  {
    numero: { type: Number, required: true, unique: true },
    nombre: { type: String, required: true, trim: true },
    marca:  { type: String, required: true, trim: true },
    tipo:   { type: String, required: true, trim: true },
    tipo2:  { type: String, required: true, trim: true },
    url:    { type: String, required: true, trim: true }
  }
);


export const PerfumeHombre = model('PerfumeHombre', PerfumeBaseSchema, 'hombre');
export const PerfumeMujer  = model('PerfumeMujer',  PerfumeBaseSchema, 'mujer');
