import { ObjectId } from "mongoose";

interface IMessage {
    sender: ObjectId,
    sentAt: Date,
    content: String,
    attachments: ObjectId[] | undefined;
}

export default IMessage;