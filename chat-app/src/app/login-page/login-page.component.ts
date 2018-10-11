import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

    constructor(private http: HttpClient) {
    }

    ngOnInit() {
    }

    public addUser() {
        const login: HTMLInputElement = document.querySelector('#login');
        const pass: HTMLInputElement = document.querySelector('#password');

        console.log(login.value);
        console.log(pass.value);
        const o = {nick: login.value, password: pass.value};

        console.log(JSON.stringify(o));

        const headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json');
        headers.set('Access-Control-Allow-Origin', '*');
        headers.set('Access-Control-Allow-Origin', 'true');
        const objectObservable = this.http.post('http://51.38.133.76:90/users', {nick: login.value, password: pass.value, headers});

        objectObservable.subscribe((e) => {
        }, (e) => {
        });
    }
}

