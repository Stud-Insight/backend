import { ObjectId, Schema, model } from "mongoose";

interface IAcademicProject {
    student: ObjectId,
    referent: ObjectId,
    supervisor: ObjectId,
    subject: String,
    type: String,
    files?: ObjectId,   
    startDate: Date,
    finalDate: Date,
}

const userSchema = new Schema<IAcademicProject>({
    student: { type: Schema.Types.ObjectId, ref: "User", required: true },
    referent: { type: Schema.Types.ObjectId, ref: "User", required: true },
    supervisor: { type: Schema.Types.ObjectId, ref: "User", required: true },
    subject: { type: String, required: true},
    type: { type: String, enum:["Memoire","Intership","S.R.W"], required: true}, // mémoire | Stage | T.E.R
    files: { type: Schema.Types.ObjectId, ref: "Files", required: false },
    startDate: { type: Date, required: true},
    finalDate: {type: Date, required: true}
}, { minimize: false });

export default model("academicProject", userSchema);