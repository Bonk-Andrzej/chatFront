export class MessageDTO {
    private senderId: number;
    private receiverId: number;
    private content: string;

    constructor() {
    }

    public getSenderId(): number {
        return this.senderId
    }

    public setSenderId(senderId: number) {
        this.senderId = senderId;
    }

    public getReceiverId(): number {
        return this.receiverId;
    }

    public setReceiverId(recieverId: number) {
        this.receiverId = recieverId;
    }

    public getContent(): string {
        return this.content;
    }

    public setContent(content: string) {
        this.content = content;
    }

}