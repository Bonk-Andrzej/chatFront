import {Injectable} from '@angular/core';

import {MessagesRepositoryService} from '../../repository/message-repostiory/message-repository.service';
import {UserDTO} from '../../repository/user-repository/user-d-t.o';
import {MessageDTO} from '../../repository/message-repostiory/messageDTO';
import {MessageSEND} from '../../repository/message-repostiory/messageSEND';
import {WSRClientService} from "../WSRClient/wsrclient.service";
import {LocalType} from "../WSRClient/types/LocalType";
import {MessageDTO as MessageDTOWSR} from "../WSRClient/dto/MessageDTO";
import {RemoteType} from "../WSRClient/types/RemoteType";

@Injectable({
    providedIn: 'root'
})
export class MessageServiceService {

    private sender: UserDTO;
    private receiver: UserDTO;
    private onSetReceiverEvent: () => void;
    private messages: Array<MessageDTO>;

    constructor(private messageRepository: MessagesRepositoryService,
                private wsr: WSRClientService) {


        wsr.WRSClient.addProcedure(LocalType.ADDMESSAGE, new MessageDTOWSR(),data => {

            const messageDTO = new MessageDTO(null,data.getContent(),"",data.getSenderId(),data.getReceiverId());
            this.messages.push(messageDTO);

        });


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


    public getConversation(limit: number, startBound: number): Array<MessageDTO> {
        this.messageRepository.getConversation(this.sender, this.receiver, limit, startBound).subscribe(value => {
            this.messages = value;
        });
        return this.messages;
    }


    public sendMessage(content: string) {
        if (this.receiver) {
            console.log(this.receiver);

            console.log(Date.now().toString());
            const messageDTO = new MessageDTO(null,content,"some time ago",this.sender.idUser,this.receiver.idUser);
            this.messages.push(messageDTO);

            const messageDTOWSR = new MessageDTOWSR();
            messageDTOWSR.setContent(content);
            messageDTOWSR.setReceiverId(this.receiver.idUser);
            messageDTOWSR.setSenderId(this.sender.idUser);


            this.wsr.WRSClient.executeRemoteProcedure(RemoteType.FORWARDMESSAGE, messageDTOWSR)
        }
    }

    public onSetReceiver(event: () => void) {
        this.onSetReceiverEvent = event;
    }
}
