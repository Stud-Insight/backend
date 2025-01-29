import { Types } from "mongoose";

export interface IMessage {
    sender: Types.ObjectId,
    sentAt: Date,
    content: String,
    attachments?: Types.ObjectId[]
}

export interface IMessage_Mongoose extends IMessage {
    _id: Types.ObjectId
}