import {Component, Input, OnInit} from '@angular/core';

import {MessageDTO} from '../../services/message-repostiory/messageDTO';
import {MessagesRepositoryService} from '../../services/message-repostiory/message-repository.service';
import {MessageSEND} from '../../services/message-repostiory/messageSEND';
import {AuthorizationServiceService} from '../../services/authorization-service/authorization-service.service';
import {Router} from '@angular/router';

import {ActiveUserListComponent} from '../active-user-list/active-user-list.component';
import {MessageServiceService} from '../../services/messege-service/message-service.service';
import {UserDTO} from '../../services/user-repository/user-d-t.o';


@Component({
    selector: 'app-conversations',
    templateUrl: './conversations.component.html',
    styleUrls: ['./conversations.component.scss'],
})
export class ConversationsComponent implements OnInit {

    public listMessages: Array<MessageDTO>;
    public messageReceiver = 'MESSAGE RECEIVER';
    public authorizedUser: UserDTO;
    private receiver: UserDTO;
    private sender: UserDTO;


    constructor(private messagesRepository: MessagesRepositoryService,
                private authorizationService: AuthorizationServiceService,
                private messageService: MessageServiceService,
                private router: Router) {
        this.listMessages = [];
    }

    ngOnInit() {
        if (!this.authorizationService.isAuthorizated()) {
            this.router.navigateByUrl('/login');
        } else {
            this.authorizedUser = this.authorizationService.getAuthorizatedUser();
            console.log(this.authorizedUser);
            this.sender = this.authorizedUser;
        }
    }

    public sendMessage() {
        const content: HTMLInputElement = document.querySelector('#conversation-text-input');

        let contentValue = content.value;
        this.messageService.sendMessage2(contentValue);

        content.value = '';


    }
}

