import config from "@/config/config";
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
    type: { type: String, enum: ['private', 'group'], required: true },
    groupName: { type: String, required: function() { return this.type == 'group'; } },
    groupCreatedAt: { type: Date, required: function() { return this.type == 'group'; } },
    messages: { type: [messageSchema], required: true }
});

export default model("chats", chatSchema);

