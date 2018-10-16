import {Component, OnInit} from '@angular/core';

import {UserRepositoryService} from '../../services/user-repository/user-repository.service';
import {AuthorizationServiceService} from '../../services/authorization-service/authorization-service.service';
import {MessageServiceService} from '../../services/messege-service/message-service.service';
import {UserDTO} from '../../services/user-repository/user-d-t.o';

@Component({
    selector: 'app-active-user-list',
    templateUrl: './active-user-list.component.html',
    styleUrls: ['./active-user-list.component.scss']
})
export class ActiveUserListComponent implements OnInit {

    public users: Array<UserDTO>;


    constructor(private userRepository: UserRepositoryService,
                private authorizationService: AuthorizationServiceService,
                private messageService: MessageServiceService) {

        this.users = [];
    }

    ngOnInit() {

        this.userRepository.getUsers().subscribe(users => {
            for (const user of users) {
                this.users.push(new UserDTO(user.id, user.nick));
            }
        });
    }

    sendUserToConversationService(user: UserDTO) {
        this.messageService.setReceiver(user);
        console.log(this.messageService.getSender().id);
        console.log(this.messageService.getReceiver().id);
    }

}
