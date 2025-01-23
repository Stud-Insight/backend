import { ObjectId } from "mongoose";
import IMessage from "./IMessage";

interface IChat {
    members: ObjectId[],
    type: String,
    groupName: String,
    groupCreatedAt: Date,
    messages: IMessage[]
}

export default IChat;