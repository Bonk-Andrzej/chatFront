import {Component, OnInit} from '@angular/core';
import {HttpClient} from '../../../../node_modules/@angular/common/http';
import {User} from '../../services/user-repository/user';
import {UserRepositoryService} from '../../services/user-repository/user-repository.service';

@Component({
    selector: 'app-active-user-list',
    templateUrl: './active-user-list.component.html',
    styleUrls: ['./active-user-list.component.scss']
})
export class ActiveUserListComponent implements OnInit {

    public users: Array<User>;
    private http: HttpClient;
    private userRepository: UserRepositoryService;

    constructor(http: HttpClient, userRepository: UserRepositoryService) {
        this.http = http;
        this.userRepository = userRepository;
        this.users = [];
    }

    ngOnInit() {

        this.userRepository.getAllUsers().subscribe(users => {
            for (const user of users) {
                this.users.push(new User(user.id, user.nick));
            }
        });

    }

    sendIdToConversationService(id: number) {
        console.log(id);
    }
}
