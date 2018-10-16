import {Injectable} from '@angular/core';

import {UserRepositoryService} from '../user-repository/user-repository.service';
import {MessageServiceService} from '../messege-service/message-service.service';
import {UserDTO} from '../user-repository/user-d-t.o';

@Injectable({
    providedIn: 'root'
})
export class AuthorizationServiceService {

    private authorizedUser: UserDTO = null;

    private success: () => void;
    private failded: () => void;

    constructor(private userRepository: UserRepositoryService,
                private messageService: MessageServiceService) {

    }

    public authenticate(nick: string, password: string) {
        this.userRepository.getUserByNickPass(nick, password).subscribe((user: UserDTO) => {
            this.authorizedUser = user;
            if (this.success) {
                this.messageService.setSender(user)
                this.success();
            }
        }, () => {
            this.failded();
        });
    }

    public isAuthorizated(): boolean {
        return (this.authorizedUser != null);
    }

    public getAuthorizatedUser(): UserDTO {
        return this.authorizedUser;
    }

    public onAuthorizated(observer: () => void) {
        this.success = observer;
    }

    public onFaild(observer: () => void) {
        this.failded = observer;
    }

    public getAuthorizedUser(): UserDTO {
        return this.authorizedUser;
    }

}
