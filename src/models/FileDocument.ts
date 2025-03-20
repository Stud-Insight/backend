import config from "@/config/config";
import IFileDocument from "@/interfaces/IFileDocument";
import { model, Schema, Types } from "mongoose";

const fileDocumentSchema = new Schema<IFileDocument>({
    rawFile: { type: Schema.Types.ObjectId, ref: config.database.filesBucketName + '.files', required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'users', required: true }
}, { minimize: false });

fileDocumentSchema.methods.canBeViewedByUser = async (userId: string): Promise<boolean> => {
    return await (async () => true)();
}

export default model('files.documents', fileDocumentSchema);