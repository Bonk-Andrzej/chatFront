import {Injectable} from '@angular/core';

import {MessagesRepositoryService} from '../../repository/message-repostiory/message-repository.service';
import {UserDTO} from '../../repository/user-repository/user-d-t.o';
import {MessageDTO} from '../../repository/message-repostiory/messageDTO';
import {MessageSEND} from '../../repository/message-repostiory/messageSEND';
import {Observable, observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MessageServiceService {

    private sender: UserDTO;
    private receiver: UserDTO;
    private onSetReceiverEvent: () => void;

    constructor(private messageRepository: MessagesRepositoryService) {
    }


    public setReceiver(receiver: UserDTO) {
        this.receiver = receiver;
        if (this.onSetReceiverEvent) {
            this.onSetReceiverEvent();
        }
    }

    public getReceiver(): UserDTO {
        return this.receiver;
    }

    public setSender(sender: UserDTO) {
        this.sender = sender;
        console.log(sender, 'sender <<<');
    }

    public getSender(): UserDTO {
        return this.sender;
    }


    public getConversation(limit: number, startBound: number): Observable<Array<MessageDTO>> {
        return this.messageRepository.getConversation(this.sender, this.receiver, limit, startBound);
    }


    public sendMessage2(content: string) {
        if (this.receiver) {
            console.log(this.receiver);
            const messageSEND = new MessageSEND(content, this.sender.idUser, this.receiver.idUser);

            this.messageRepository.postMessages(messageSEND).subscribe(message => {
                console.log(message);
            }, error1 => console.log(error1));
        }
    }

    public onSetReceiver(event: () => void) {
        this.onSetReceiverEvent = event;
    }
}
