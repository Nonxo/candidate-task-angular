import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Observable } from "rxjs";
import { AppState, User } from "../core/state/users/users.model";
import { select, Store } from "@ngrx/store";
import { UsersPageActions } from "../core/state/users/users.action";
import { selectAllUsers } from "../core/state/users/users.selector";
import { UsersTableComponent } from "./users-table/users-table.component";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  standalone: true,
  imports: [CommonModule, UsersTableComponent],
})
export class UsersComponent implements OnInit {
  users$: Observable<User[]> | undefined;

  constructor(private readonly store: Store<AppState>) {
  }

  ngOnInit() {
    this.getAllUsers();
  }


  private getAllUsers() {
    this.store.dispatch(UsersPageActions.loadUsers());
    this.users$ = this.store.pipe(select(selectAllUsers));
  }

}
