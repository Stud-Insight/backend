import { Types } from "mongoose";

interface IFileDocument {
    _id: Types.ObjectId,
    rawFile: Types.ObjectId,
    owner: Types.ObjectId,
    canBeViewedByUser(userId: Types.ObjectId): Promise<boolean>;
}

export default IFileDocument;