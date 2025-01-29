import config from "@/config/config";
import ChatType from "@/enums/ChatType";
import { IChat_Mongoose } from "@/interfaces/IChat";
import { IMessage_Mongoose } from "@/interfaces/IMessage";
import { model, Schema } from "mongoose"

const messageSchema = new Schema<IMessage_Mongoose>({
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    sentAt: { type: Date, required: true },
    content: { type: String, required: true },
    attachments: { type: [Schema.Types.ObjectId], ref: config.database.filesBucketName + ".files" },
});

const chatSchema = new Schema<IChat_Mongoose>({
    members: { type: [Schema.Types.ObjectId], ref: "User", default: [], required: true },
    type: { type: String, enum: Object.values(ChatType), required: true },
    groupName: { type: String, required: function() { return this.type == ChatType.GROUP; } },
    groupCreator: { type: Schema.Types.ObjectId, required: function() { return this.type == ChatType.GROUP; } },
    groupCreatedAt: { type: Date, required: function() { return this.type == ChatType.GROUP; } },
    messages: { type: [messageSchema], default: [], required: true }
});

export default model("chats", chatSchema);

