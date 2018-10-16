export class UserDTO {
    private _id: number;
    private _nick: string;

    constructor(id: number, nick: string) {
        this._id = id;
        this._nick = nick;
    }


    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get nick(): string {
        return this._nick;
    }

    set nick(value: string) {
        this._nick = value;
    }
}
