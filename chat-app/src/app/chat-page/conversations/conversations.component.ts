import {Component, OnInit} from '@angular/core';

import {MessagesRepositoryService} from '../../services/messages-repository/messages-repository-service';
import {Message} from '../../services/messages-repository/message';


@Component({
    selector: 'app-conversations',
    templateUrl: './conversations.component.html',
    styleUrls: ['./conversations.component.scss']
})
export class ConversationsComponent implements OnInit {

    private messagesRepository: MessagesRepositoryService;
    private listMessages: Message;
    public messageReceiver = 'MESSAGE RECEIVER';

    constructor() {
    }

    ngOnInit() {
    }

    public printMsgOnBox() {
        this.messagesRepository.getMessages().subscribe(messages => {
            for (const message of messages) {
                this.listMessages.push(new Message(message.id.valueOf(), message.content, message.sendDate, message.idSender, message.idReceiver));
            }

        });
    }
}

