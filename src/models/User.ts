import { ObjectId, Schema, model } from "mongoose";

interface IUser {
    firstName: String,
    lastName: String,
    password?: String,
    email: String,
    roles: ObjectId[],
    profilePicture: String,
    activationDate?: Date,
    activationToken?: String,
    lastLogin?: Date,
    refreshToken?: String
}


type Validator = (v: any) => Boolean; 

const isEmailValid: Validator = (v: string) => {
    return /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim.test(v);
}



const userSchema = new Schema<IUser>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: [function() { return this.activationDate != undefined }, "An activated account must have a password."]},
    roles: { type: [Schema.Types.ObjectId], ref: "Role", default: [] },
    email: {
        type: String,
        validate: [isEmailValid, "{VALUE} is not a valid email."],
        required: true
    },
    profilePicture: { type: String, required: false },
    activationDate: { type: Date },
    activationToken: { type: String },
    lastLogin: { type: Date },
    refreshToken: { type: String }
}, { minimize: false });

export default model("users", userSchema);