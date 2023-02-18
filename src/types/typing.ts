export interface User {
    id: number;
    pic: string | null;
    email: string | null;
    username: string | null;
    created_at: string | Date | null;
}


export type ChatType = {
    id: number;
    usersjson: User[];
    users: number[];
    created_at: Date | string | null;
    lastMessage: string | null;
    lastMessageDate: Date | string | null;
}

export interface Message {
    id: number;
    created_at: Date | string | null;
    message: string;
    chatId: number;
    userIdSender: number;
    user: User;
}