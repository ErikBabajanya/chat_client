import { User } from "./user.interface";

export interface MyChatList {
    user: User,
    lastMsg: {
        _id: string;
        chatId: string;
        senderId: string;
        recipientId: string;
        text: string;
        createdAt: string;
        updatedAt: string;
    }
}