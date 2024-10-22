import {Component, inject, OnInit} from "@angular/core";
import { CommonModule } from "@angular/common";
import { Observable } from "rxjs";
import { AppState, User } from "../core/state/users/users.model";
import { select, Store } from "@ngrx/store";
import {UserDetailsActions, UsersPageActions} from "../core/state/users/users.action";
import {selectCurrentUser, selectFilteredUsers} from "../core/state/users/users.selector";
import { UsersTableComponent } from "./users-table/users-table.component";
import {UserDetailsComponent} from "./user-details/user-details.component";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  standalone: true,
  providers: [MessageService],
  imports: [CommonModule, UsersTableComponent, UserDetailsComponent, ToastModule],
})
export class UsersComponent implements OnInit {

  users$: Observable<User[]> | undefined;
  selectedUser$: Observable<User | undefined> | undefined;
  modalVisible: boolean = false;

  private readonly store: Store<AppState> = inject(Store);
  private readonly messageService: MessageService = inject(MessageService);

  ngOnInit() {
    this.getAllUsers();
  }


  viewUserDetails(user: User) {
    this.store.dispatch(UserDetailsActions.selectUser({ userId: user.id }));
    this.selectedUser$ = this.store.pipe(select(selectCurrentUser));
    this.modalVisible = true;
  }

  filterUsers(keyword: string) {
    this.store.dispatch(UsersPageActions.filterUsers({ keyword }));
  }


  private getAllUsers() {
    this.store.dispatch(UsersPageActions.loadUsers());
    this.users$ = this.store.pipe(select(selectFilteredUsers));
  }

  showUpdatedUserToast() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User updated successfully' });
  }

}
