import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Email inválido"],
  },
  passwordHash: { type: String, required: true, select: false },
  activo: { type: Boolean, default: true },
}, );


export default mongoose.model("User", UserSchema, "user");
