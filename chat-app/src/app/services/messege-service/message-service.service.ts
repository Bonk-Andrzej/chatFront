import {Injectable} from '@angular/core';

import {MessagesRepositoryService} from '../message-repostiory/message-repository.service';
import {UserDTO} from '../user-repository/user-d-t.o';
import {MessageDTO} from '../message-repostiory/messageDTO';
import {MessageSEND} from '../message-repostiory/messageSEND';

@Injectable({
    providedIn: 'root'
})
export class MessageServiceService {

    private sender: UserDTO;
    private receiver: UserDTO;

    private receiverMessages: Array<MessageDTO>;

    constructor(private messageRepository: MessagesRepositoryService) {
    }


    public setReceiver(receiver: UserDTO) {
        this.receiver = receiver;
    }

    public getReceiver(): UserDTO {
        return this.receiver;
    }

    public setSender(sender: UserDTO) {
        this.sender = sender;
    }

    public getSender(): UserDTO {
        return this.sender;
    }

    public getMessagesSendBySender(startBound: number, toBound: number): Array<MessageDTO> {
        let senderMessages: Array<MessageDTO>;
        senderMessages = [];
        this.messageRepository.getMessages(this.sender, this.receiver, startBound, toBound).subscribe(messages => {
            for (const message of messages) {
                senderMessages.push(message);
            }
        });
        return senderMessages;
    }

    public getMessagesSendByReceiver(startBound: number, toBound: number): Array<MessageDTO> {
        let senderMessages: Array<MessageDTO>;
        senderMessages = [];
        this.messageRepository.getMessages(this.receiver, this.sender, startBound, toBound).subscribe(messages => {
            for (const message of messages) {
                senderMessages.push(message);
            }
        });
        return senderMessages;
    }

    public sendMessage2(content: string) {
        if (this.receiver) {
            const messageSEND = new MessageSEND(content, this.sender.id, this.receiver.id);
            this.messageRepository.postMessages(messageSEND).subscribe(message => {
                console.log(message);
            });
        }
    }
}
