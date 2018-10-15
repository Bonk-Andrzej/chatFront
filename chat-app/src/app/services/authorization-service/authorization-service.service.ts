import {Injectable} from '@angular/core';
import {User} from '../user-repository/user';
import {UserRepositoryService} from '../user-repository/user-repository.service';

@Injectable({
    providedIn: 'root'
})
export class AuthorizationServiceService {

    private authorizedUser: User = null;
    private userRepository: UserRepositoryService;
    private success: () => void;
    private failded: () => void;

    constructor(userRepository: UserRepositoryService) {
        this.userRepository = userRepository;
    }

    public authenticate(nick: string, password: string) {
        this.userRepository.getUserByNickPass(nick, password).subscribe((user: User) => {
            this.authorizedUser = user;
            if (this.success) {
                this.success();
            }
        }, () => {
            this.failded();
        });
    }

    public isAuthorizated(): boolean {
        return (this.authorizedUser != null);
    }

    public getAuthorizatedUser(): User {
        return this.authorizedUser;
    }

    public onAuthorizated(observer: () => void) {
        this.success = observer;
    }

    public onFaild(observer: () => void) {
        this.failded = observer;
    }

    public getAuthorizedUser(): User {
        return this.authorizedUser;
    }

}
