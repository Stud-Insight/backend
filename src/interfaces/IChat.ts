import { Types } from "mongoose";
import IMessage from "./IMessage";

interface IChat {
    members: Types.ObjectId[],
    type: String,
    groupName: String,
groupCreator: Types.ObjectId,
    groupCreatedAt: Date,
    messages: IMessage[]
}

export default IChat;