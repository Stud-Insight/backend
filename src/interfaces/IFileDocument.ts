import { Types } from "mongoose";

interface IFileDocument {
    _id: Types.ObjectId,
    rawFile: Types.ObjectId,
    createdAt: Date,
    updatedAt: Date,
    permissions: {
        /*byType: {
            read: Types.ObjectId[],
            write: Types.ObjectId[],
            delete: Types.ObjectId[]                
        },*/
        byUser: Map<Types.ObjectId, String>
    }
}

export default IFileDocument;