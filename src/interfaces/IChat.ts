import { Types } from "mongoose";
import ChatType from "@/enums/ChatType";
import { IMessage, IMessage_Mongoose } from "./IMessage";

export interface IChat {
    members: Types.ObjectId[],
    type: ChatType,
    groupName: String,
    groupCreator: Types.ObjectId,
    groupCreatedAt: Date,
    // messages: IMessage[]
}

export interface IChat_Mongoose extends IChat {
    _id: Types.ObjectId,
    messages: IMessage_Mongoose[]
}