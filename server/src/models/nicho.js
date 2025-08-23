import { Schema, model } from 'mongoose';

const PerfumeNichoSchema = new Schema({
  numero:  { type: Number, required: true, unique: true },
  nombre:  { type: String, required: true, trim: true },
  marca:   { type: String, required: true, trim: true },

  genero:  { type: String, required: true, enum: ['hombre','mujer','unisex'] },

  ocasion: {
    type: [{ type: String, enum: ['diario','formal','citas','fiestas'] }],
    required: true,
    validate: {
      validator: (v) => Array.isArray(v) && v.length > 0,
      message: 'ocasion debe tener al menos un valor'
    }
  },

  clima:   { type: String, required: true, enum: ['frio','calor','versatil'] },
  edad:    { type: String, required: true, enum: ['juvenil','maduro','ambos'] },

  tipo:    { type: String, required: true, trim: true },
  tipo2:   { type: String, required: true, trim: true },
  url:     { type: String, required: true, trim: true },
  dispo:   { type: Boolean, required: true }
});


export const PerfumeNicho = model('PerfumeNicho', PerfumeNichoSchema, 'nicho');
