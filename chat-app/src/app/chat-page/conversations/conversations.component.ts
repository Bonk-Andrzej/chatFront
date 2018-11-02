import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import {MessageDTO} from '../../repository/message-repostiory/messageDTO';
import {MessagesRepositoryService} from '../../repository/message-repostiory/message-repository.service';
import {AuthorizationServiceService} from '../../services/authorization-service/authorization-service.service';
import {Router} from '@angular/router';
import {MessageServiceService} from '../../services/messege-service/message-service.service';
import {UserDTO} from '../../repository/user-repository/user-d-t.o';
import {Observable} from "rxjs";


@Component({
    selector: 'app-conversations',
    templateUrl: './conversations.component.html',
    styleUrls: ['./conversations.component.scss'],
})
export class ConversationsComponent implements OnInit {

    public conversation: Observable<Array<MessageDTO>>;
    public sender: UserDTO;
    public receiver: UserDTO;
    public displayLayout = false;
    public conversationStatusBar = {
        'backgroundColor': '#df1b37'
    };

    @ViewChild('conversationListRef')
    private conversationListRef: ElementRef<HTMLDivElement>;

    constructor(private messagesRepository: MessagesRepositoryService,
                private authorizationService: AuthorizationServiceService,
                private messageService: MessageServiceService,
                private router: Router) {
        this.conversation = this.messageService.getMessagesObs();
        this.conversation.subscribe(() => {
            console.log("update")
            if (this.conversationListRef) {

                const nativeElement = this.conversationListRef.nativeElement;
                setTimeout(() => {
                    console.log(nativeElement.scrollHeight)
                    nativeElement.scrollTop = nativeElement.scrollHeight;
                }, 0)
            }
        })
    }

    ngOnInit() {
        if (!this.authorizationService.isAuthorizated()) {
            this.router.navigateByUrl('/login');

        } else {

            this.messageService.onSetReceiver(() => {
                this.getConversation(100, 0);
                this.displayLayout = true;
                this.conversationStatusBar.backgroundColor = '#56c130';
            });

            this.sender = this.authorizationService.getAuthorizatedUser();
            this.messageService.setSender(this.sender);
        }
    }

    public sendMessage(inputMessageNode: HTMLInputElement) {
        const messageContent = inputMessageNode.value;
        this.messageService.sendMessage(messageContent);
        inputMessageNode.value = '';
    }

    public getConversation(limit: number, startBound: number) {
        this.messageService.getConversation(limit, startBound);
        this.receiver = this.messageService.getReceiver();

    }

}

