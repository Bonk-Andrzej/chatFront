import {Component, OnInit} from '@angular/core';
import {User} from '../../services/user-repository/user';
import {UserRepositoryService} from '../../services/user-repository/user-repository.service';

@Component({
    selector: 'app-active-user-list',
    templateUrl: './active-user-list.component.html',
    styleUrls: ['./active-user-list.component.scss']
})
export class ActiveUserListComponent implements OnInit {

    public users: Array<User>;
    private userRepository: UserRepositoryService;

    constructor(userRepository: UserRepositoryService) {
        this.userRepository = userRepository;
        this.users = [];
    }

    ngOnInit() {

        this.userRepository.getUsers().subscribe(users => {
            for (const user of users) {
                this.users.push(new User(user.id, user.nick));
            }
        });
    }

    sendIdToConversationService(user: User) {
        this.userRepository.deleteUser(user.id).subscribe();
        let i = 0;
        for (const user1 of this.users) {
            if (user === user1) {
                this.users.splice(i, 1);
            }
            i++;
        }
    }
}
