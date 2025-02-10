import config from "@/config/config";
import IFileDocument from "@/interfaces/IFileDocument";
import { model, Schema, Types } from "mongoose";

const fileDocumentSchema = new Schema<IFileDocument>({
    rawFile: { type: Schema.Types.ObjectId, ref: config.database.filesBucketName + '.files', required: true },
    createdAt: { type: Date, default: new Date(), required: true },
    updatedAt: { type: Date, default: new Date(), required: true },
    permissions: {
        byUser: {
            type: Map,
            of: String,
            default: new Map<Types.ObjectId, String>(),
            required: true
        }
    }
}, { minimize: false });

export default model('files.documents', fileDocumentSchema);