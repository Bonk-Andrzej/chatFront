import {Component, Inject, Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Component({
    selector: 'app-chat-page',
    templateUrl: './chat-page.component.html',
    styleUrls: ['./chat-page.component.css']
})
export class ChatPageComponent implements OnInit {
    public users: Array<User> = [];
    private http: HttpClient;

    constructor(http: HttpClient) {
        this.http = http;
    }


    ngOnInit() {
    }

    public gerUsers() {
        const observer = this.http.get<Array<UserDTO>>('http://51.38.133.76:90/users');
        observer.subscribe(((users) => {
            this.users = [];
            for (const userFromWeb of users) {
                this.users.push(new User(userFromWeb.id, userFromWeb.nick));
            }
        }));
    }

    public addUser() {
        const login: HTMLInputElement = document.querySelector('#login');
        const pass: HTMLInputElement = document.querySelector('#password');

        console.log(login.value);
        console.log(pass.value);
        const o = {nick: login.value, password: pass.value};

        console.log(JSON.stringify(o));

        const headers = new HttpHeaders()
        headers.set('Content-Type', 'application/json');
        headers.set('Access-Control-Allow-Origin', '*');
        headers.set('Access-Control-Allow-Origin', 'true');
        const objectObservable = this.http.post('http://51.38.133.76:90/users', {nick: login.value, password: pass.value, headers});

        objectObservable.subscribe((e) => {
        }, (e) => {
        });
    }
}


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

export class UserDTO {
    public id: number;
    public nick: string;

    constructor(id: number, nick: string) {
        this.id = id;
        this.nick = nick;
    }

}

export class UserNewDTO {
    public id: number;
    public nick: string;
    public password: string;

    constructor(id: number, nick: string, password: string) {
        this.id = id;
        this.nick = nick;
        this.password = password;
    }

}


