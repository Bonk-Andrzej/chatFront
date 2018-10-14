import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {NewUser} from '../services/user-repository/newUser';
import {UserRepositoryService} from '../services/user-repository/user-repository.service';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

    constructor(private http: HttpClient, private userRepository: UserRepositoryService) {
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
        const objectObservable = this.http.post('http://localhost:8080/users', {nick: login.value, password: pass.value, headers});

        objectObservable.subscribe((e) => {
        }, (e) => {
        });
    }

    public addUser2() {
        const login: HTMLInputElement = document.querySelector('#login');
        const pass: HTMLInputElement = document.querySelector('#password');

        const newUser: NewUser = new NewUser(login.value, pass.value);
        console.log(newUser.nick);
        console.log(newUser.password);

        const objectObservable = this.userRepository.postNewUser(newUser);
        objectObservable.subscribe(msg => {
            console.log(msg);
        });
    }
}

