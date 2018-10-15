import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MessageDTO} from './messageDTO';
import {MessageSEND} from './messageSEND';


@Injectable({
    providedIn: 'root'
})
export class MessagesRepositoryService {
    private http: HttpClient;
    private readonly host: string;

    constructor(http: HttpClient) {
        this.http = http;
        // this.host = 'http://51.38.133.76:90/messages/';
        this.host = 'http://localhost:8080/messages';
    }

    private getHeaders(): HttpHeaders {
        const headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json');
        headers.set('Access-Control-Allow-Origin', '*');
        headers.set('Access-Control-Allow-Origin', 'true');
        return headers;
    }

    public getMessages(): Observable<Array<MessageDTO>> {
        const headers = this.getHeaders();
        return this.http.get<Array<MessageDTO>>(this.host, {headers: headers});
    }

    public postMessages(messageSEND: MessageSEND): Observable<MessageSEND> {
        const headers = this.getHeaders();

        return this.http.post<MessageSEND>(this.host, {content: messageSEND.content,
            idSender: messageSEND.idSender, idReceiver: messageSEND.idReceiver}, {headers: headers});
    }
}
