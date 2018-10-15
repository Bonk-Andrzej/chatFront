import {Component, Input, OnInit} from '@angular/core';

import {MessageDTO} from '../../services/message-repostiory/messageDTO';
import {MessagesRepositoryService} from '../../services/message-repostiory/message-repository.service';
import {LoginPageComponent} from '../../login-page/login-page.component';
import {MessageSEND} from '../../services/message-repostiory/messageSEND';
import {AuthorizationServiceService} from '../../services/authorization-service/authorization-service.service';
import {Router} from '@angular/router';
import {User} from '../../services/user-repository/user';


@Component({
    selector: 'app-conversations',
    templateUrl: './conversations.component.html',
    styleUrls: ['./conversations.component.scss'],
})
export class ConversationsComponent implements OnInit {

    public listMessages: Array<MessageDTO>;
    public messageReceiver = 'MESSAGE RECEIVER';
    public authorizatedUser: User;


    constructor(private messagesRepository: MessagesRepositoryService,
                private autenticateService: AuthorizationServiceService,
                private router: Router) {
        this.listMessages = [];
    }

    ngOnInit() {
        if (!this.autenticateService.isAuthorizated()) {
            this.router.navigateByUrl('/login');
        } else {
            this.authorizatedUser = this.autenticateService.getAuthorizatedUser();
            console.log(this.authorizatedUser);
        }
    }

    public printMsgOnBox() {
        this.messagesRepository.getMessages().subscribe(messages => {
            for (const message of messages) {
                this.listMessages
                    .push(new MessageDTO(message.id, message.content, message.sendDate, message.idSender, message.idReceiver));
            }
            this.messageReceiver = this.listMessages[0].sendDate;
        });
    }

    public sendMessage() {
        const content: HTMLInputElement = document.querySelector('#conversation-text-input');
        let idReceiver: number;
        idReceiver = 50;
        let idSender: number;
        idSender = 49;
        // idSender = this.loginPageComponent.getLoggedIdUser();


        const messageSEND = new MessageSEND(content.value, idSender, idReceiver);
        this.messagesRepository.postMessages(messageSEND).subscribe(message => {
            console.log(message);
        });
        console.log(content.value);
        console.log(idReceiver);
        console.log(idSender);
    }
}

