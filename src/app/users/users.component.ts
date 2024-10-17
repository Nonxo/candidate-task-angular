import {Component, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Observable} from "rxjs";
import {AppState, User} from "../core/state/users/users.model";
import {select, Store} from "@ngrx/store";
import {UsersPageActions} from "../core/state/users/users.action";
import {selectAllUsers, selectCurrentUser} from "../core/state/users/users.selector";
import {UsersTableComponent} from "./users-table/users-table.component";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  standalone: true,
  imports: [CommonModule, UsersTableComponent],
})
export class UsersComponent implements OnInit {
  users$: Observable<User[]> | undefined;
  selectedUser$: Observable<User | undefined> | undefined;
  filterTerm: string = '';

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.getAllUsers();

    this.users$ = this.store.pipe(select(selectAllUsers));

    this.selectedUser$ = this.store.pipe(select(selectCurrentUser));
  }


  private getAllUsers() {
    this.store.dispatch(UsersPageActions.loadUsers());
  }

  private getStatusStyle(status: boolean) {
    if (status) {

    }
  }

}
