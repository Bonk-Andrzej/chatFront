export class User {
    public id: number;
    public nick: string;

    constructor(id: number, nick: string) {
        this.id = id;
        this.nick = nick;
    }

    public getNick(): string {
        return this.nick;
    }

    public getId(): number {
        return this.id;
    }
}