export class User {
    private id: number;
    private nick: string;

    constructor(id: number, nick: string) {
        this.id = id;
        this.nick = nick;
    }

    public getNick(): string {
        return this.nick;
    }
}

