import { ObjectId } from "mongoose";

interface IMessage {
    sender: ObjectId,
    date: Date,
    content: String,
    attachments: ObjectId[] | undefined;
}

export default IMessage;