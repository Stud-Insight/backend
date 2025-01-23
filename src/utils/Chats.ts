import ChatType from "@/enums/ChatType";
import IMessage from "@/interfaces/IMessage";
import Chat from "@/models/Chat";
import User from "@/models/User";
import { Types } from "mongoose";

class Chats {

    static async createPrivateChat(userAId: Types.ObjectId, userBId: Types.ObjectId): Promise<Types.ObjectId> {
        const res = await Chat.create({
            members: [userAId, userBId],
            type: ChatType.PRIVATE
        });
        if(!res) { llog.error("Failed to create private chat."); throw new Error(); };
        return res._id;
    }

    static async createGroupChat(creatorId: Types.ObjectId, groupName?: String, ...members: Types.ObjectId[]): Promise<Types.ObjectId> {
        if(!groupName) {
            const groupUsers = await User.find({ _id: { $in: members } });            
            const groupUsersName = groupUsers.map((groupUser) => `${groupUser.firstName}.${groupUser.lastName}` );
            groupName = groupUsersName.join(',');
        }
        const res = await Chat.create({
            members,
            type: ChatType.GROUP,
            groupName,
            groupCreator: creatorId,
            groupCreatedAt: new Date()
        });
        if(!res) { llog.error("Failed to create private chat."); throw new Error(); };
        return res._id;
    }

    /*static async send(message: IMessage, chatId: Types.ObjectId): Promise<void> {
        const chat = await Chat.findByIdAndUpdate(chatId, { $push: { messages: message }});
        
        
        if(!chat) { llog.warn(`Tried to add message to chat ${chatId} which does not exist.`); return; }
    }*/

}

export default Chats;