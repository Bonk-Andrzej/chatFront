import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserDTO} from './user-d-t.o';

@Injectable({
    providedIn: 'root'
})
export class UserRepositoryService {

    private http: HttpClient;
    private readonly host: string;

    constructor(http: HttpClient) {
        this.http = http;
        this.host = 'http://51.38.133.76:90';
    }

    public getAllUsers(): Observable<Array<UserDTO>> {
        return this.http.get<Array<UserDTO>>(this.host + '/users');
    }

    public getUserById(id: number): Observable<UserDTO> {
        return this.http.get<UserDTO>(this.host + '/users/' + id);
    }
}

