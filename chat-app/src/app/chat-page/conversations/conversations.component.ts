import {Component, OnInit} from '@angular/core';

import {MessageDTO} from '../../repository/message-repostiory/messageDTO';
import {MessagesRepositoryService} from '../../repository/message-repostiory/message-repository.service';
import {AuthorizationServiceService} from '../../services/authorization-service/authorization-service.service';
import {Router} from '@angular/router';
import {MessageServiceService} from '../../services/messege-service/message-service.service';
import {UserDTO} from '../../repository/user-repository/user-d-t.o';


@Component({
    selector: 'app-conversations',
    templateUrl: './conversations.component.html',
    styleUrls: ['./conversations.component.scss'],
})
export class ConversationsComponent implements OnInit {

    public messageReceiver = 'MESSAGE RECEIVER';
    public messageSender = 'MESSAGE SENDER';
    public timeSender = '22:00';
    public timeReceiver = '23:00';
    public conversation: Array<MessageDTO>;


    public sender: UserDTO;
    public receiver: UserDTO;
    public messagesListReceiver: Array<MessageDTO>;
    public displayLayou = false;
    public startBoundMessages: number;
    public toBoundMessages: number;
    public conversationStatusBar = {
        'backgroundColor': '#df1b37'
    };


    constructor(private messagesRepository: MessagesRepositoryService,
                private authorizationService: AuthorizationServiceService,
                private messageService: MessageServiceService,
                private router: Router) {
        this.conversation = [];
        this.messagesListReceiver = [];
    }

    ngOnInit() {
        if (!this.authorizationService.isAuthorizated()) {
            this.router.navigateByUrl('/login');
        } else {
            this.messageService.onSetReceiver(() => {
                this.getConversation(100, 0);
                this.displayLayou = true;
                this.conversationStatusBar.backgroundColor = '#56c130';
            });

            this.sender = this.authorizationService.getAuthorizatedUser();
            this.messageService.setSender(this.sender);
            console.log(this.sender);


        }
    }

    public sendMessage() {
        const content: HTMLInputElement = document.querySelector('#conversation-text-input');

        const contentValue = content.value;
        this.messageService.sendMessage(contentValue);

        content.value = '';
    }

    public getConversation(limit: number, startBound: number) {
        this.messageService.getConversation(limit, startBound).subscribe((messages) => {
            console.log(messages, 'received');
            this.conversation = messages;
            console.log(this.conversation);
        });
        this.receiver = this.messageService.getReceiver();

    }

}

