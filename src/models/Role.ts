import { Schema, model } from "mongoose";

export interface IRole {
    id: string,
    name: string,
    permissions: string[]
}

const roleSchema = new Schema<IRole>({
    name: { type: String, required: [true, "A role must have a name."] },
    permissions: { type: [String], default: [], required: true }
}, { minimize: false });

export default model('roles', roleSchema);