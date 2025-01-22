import { ObjectId } from "mongoose";
import IMessage from "./IMessage";

interface IChat {
    members: ObjectId[],
    creationDate: Date,
    messages: IMessage[]
}

export default IChat;