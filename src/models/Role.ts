import { Schema, model } from "mongoose";

interface IRole {
    name: String
}

const roleSchema = new Schema<IRole>({
    name: { type: String, required: [true, "A role must have a name."] }
});

export default model('roles', roleSchema);