import { Types } from "mongoose";
import IMessage from "./IMessage";
import ChatType from "@/enums/ChatType";

interface IChat {
    members: Types.ObjectId[],
    type: ChatType,
    groupName: String,
    groupCreator: Types.ObjectId,
    groupCreatedAt: Date,
    messages: IMessage[]
}

export default IChat;