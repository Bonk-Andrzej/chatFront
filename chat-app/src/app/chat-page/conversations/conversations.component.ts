import {Component, OnInit} from '@angular/core';

import {MessageDTO} from '../../services/message-repostiory/messageDTO';
import {MessagesRepositoryService} from '../../services/message-repostiory/message-repository.service';



@Component({
    selector: 'app-conversations',
    templateUrl: './conversations.component.html',
    styleUrls: ['./conversations.component.scss'],
})
export class ConversationsComponent implements OnInit {

    private messagesRepository: MessagesRepositoryService;
    public listMessages: Array<MessageDTO>;
    public messageReceiver = 'MESSAGE RECEIVER';

    constructor( messageRepository: MessagesRepositoryService) {
        this.messagesRepository =  messageRepository;
        this.listMessages = [];
    }

    ngOnInit() {

    }

    public printMsgOnBox() {
        this.messagesRepository.getMessages().subscribe(messages => {
            for (const message of messages) {
                this.listMessages
                    .push(new MessageDTO(message.id, message.content, message.sendDate, message.idSender, message.idReceiver));
            }
                this.messageReceiver = this.listMessages[0].content;
        });
    }
}

