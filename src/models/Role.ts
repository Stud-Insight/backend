import IRole from "@/interfaces/IRole";
import { Schema, model } from "mongoose";

const roleSchema = new Schema<IRole>({
    name: { type: String, required: [true, "A role must have a name."] },
    permissions: { type: [String], default: [], required: true }
}, { minimize: false });

export default model('Role', roleSchema);