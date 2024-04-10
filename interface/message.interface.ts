export default interface Message {
    _id: string;
    chatId: string;
    senderId: string;
    recipientId: string;
    text: string;
    createdAt: string;
    updatedAt: string;
  }