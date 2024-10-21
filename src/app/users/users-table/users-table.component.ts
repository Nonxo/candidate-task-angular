import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {TableModule} from "primeng/table";
import {InputTextModule} from "primeng/inputtext";
import {TagModule} from "primeng/tag";
import {SelectModule} from "primeng/select";
import {MultiSelectModule} from "primeng/multiselect";
import {ProgressBarModule} from "primeng/progressbar";
import {ButtonModule} from "primeng/button";
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import {AppState, User} from "../../core/state/users/users.model";
import {FormsModule} from "@angular/forms";
import {SliderModule} from "primeng/slider";
import {FormatStatusPipe} from "../../core/pipe/format.status.pipe";
import {CardModule} from "primeng/card";
import {Ripple} from "primeng/ripple";
import {UserDetailsComponent} from "../user-details/user-details.component";
import {select, Store} from "@ngrx/store";
import {UserDetailsActions} from "../../core/state/users/users.action";
import {Observable} from "rxjs";
import {selectCurrentUser} from "../../core/state/users/users.selector";

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [CommonModule, TableModule, InputTextModule, TagModule, SelectModule, MultiSelectModule, ProgressBarModule, ButtonModule, IconFieldModule, InputIconModule, FormsModule, SliderModule, NgOptimizedImage, FormatStatusPipe, CardModule, Ripple, UserDetailsComponent],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersTableComponent {

  @Input() users: User[] | null = null;
  selectedUser$: Observable<User | undefined> | undefined;
  modalVisible: boolean = false;

  constructor(private readonly store: Store<AppState>) { }

  getStatusStyle(status: boolean) {
    if (status) {
      return 'success'
    } else {
      return 'danger'
    }
  }

  onViewUser(user: User) {
    this.store.dispatch(UserDetailsActions.selectUser({ userId: user.id }));
    this.selectedUser$ = this.store.pipe(select(selectCurrentUser));
    this.modalVisible = true;
  }

}