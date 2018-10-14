export class MessageDTO {
    private _id: number;
    private _content: string;
    private _sendDate: string;
    private _idSender: number;
    private _idReceiver: number;


    constructor(id: number, content: string, sendDate: string, idSender: number, idReceiver: number) {
        this._id = id;
        this._content = content;
        this._sendDate = sendDate;
        this._idSender = idSender;
        this._idReceiver = idReceiver;
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get content(): string {
        return this._content;
    }

    set content(value: string) {
        this._content = value;
    }

    get sendDate(): string {
        return this._sendDate;
    }

    set sendDate(value: string) {
        this._sendDate = value;
    }

    get idSender(): number {
        return this._idSender;
    }

    set idSender(value: number) {
        this._idSender = value;
    }

    get idReceiver(): number {
        return this._idReceiver;
    }

    set idReceiver(value: number) {
        this._idReceiver = value;
    }
}
