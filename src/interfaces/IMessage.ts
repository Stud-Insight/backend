import { Types } from "mongoose";

interface IMessage {
    sender: Types.ObjectId,
    sentAt: Date,
    content: String,
    attachments?: Types.ObjectId[];
}

export default IMessage;