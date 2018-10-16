import {Component, OnInit, Output} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {NewUser} from '../services/user-repository/newUser';
import {UserRepositoryService} from '../services/user-repository/user-repository.service';
import {AuthorizationServiceService} from '../services/authorization-service/authorization-service.service';
import {p} from '@angular/core/src/render3';

import {Router} from '@angular/router';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

    public access = '';
    private loggedIdUser: number;
    public statusBar = {
        'backgroundColor': '#56c130'
    };


    constructor(private http: HttpClient,
                private userRepository: UserRepositoryService,
                private authorizationService: AuthorizationServiceService,
                private router: Router) {
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

    public registerUser() {
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

    public loginUser() {
        const login: HTMLInputElement = document.querySelector('#login');
        const pass: HTMLInputElement = document.querySelector('#password');

        this.authorizationService.authenticate(login.value, pass.value);

        this.authorizationService.onAuthorizated(() => {
            this.router.navigateByUrl('/chat');
        });
        this.authorizationService.onFaild(() => {
                this.statusBar.backgroundColor = '#df1b37';
            }
        );
    }


    public getLoggedIdUser() {
        return this.loggedIdUser;
    }

}




