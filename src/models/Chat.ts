import config from "@/config/config";
import ChatType from "@/enums/chatType";
import IChat from "@/interfaces/IChat";
import IMessage from "@/interfaces/IMessage";
import { model, Schema } from "mongoose"

const messageSchema = new Schema<IMessage>({
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    sentAt: { type: Date, required: true },
    content: { type: String, required: true },
    attachments: { type: [Schema.Types.ObjectId], ref: config.database.filesBucketName + ".files" },
});

const chatSchema = new Schema<IChat>({
    members: { type: [Schema.Types.ObjectId], ref: "User", default: [], required: true },
    type: { type: String, enum: Object.values(ChatType), required: true },
    groupName: { type: String, required: function() { return this.type == ChatType.GROUP; } },
    groupCreator: { type: Schema.Types.ObjectId, required: function() { return this.type == ChatType.GROUP; } },
    groupCreatedAt: { type: Date, required: function() { return this.type == ChatType.GROUP; } },
    messages: { type: [messageSchema], required: true }
});

export default model("chats", chatSchema);

