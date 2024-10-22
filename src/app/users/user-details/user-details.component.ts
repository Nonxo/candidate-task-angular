import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DialogModule} from "primeng/dialog";
import {AppState, User} from "../../core/state/users/users.model";
import {FloatLabelModule} from "primeng/floatlabel";
import {InputTextModule} from "primeng/inputtext";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Select} from "primeng/select";
import {roles} from "../../core/utils/constant";
import {RadioButtonModule} from "primeng/radiobutton";
import {ButtonModule} from "primeng/button";
import {DatePickerModule} from "primeng/datepicker";
import {Store} from "@ngrx/store";
import {UserDetailsActions} from "../../core/state/users/users.action";

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [
    DialogModule,
    FloatLabelModule,
    InputTextModule,
    ReactiveFormsModule,
    Select,
    RadioButtonModule,
    ButtonModule,
    DatePickerModule
  ],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent implements OnInit {
  @Input() user!: User | null | undefined
  @Input() visible: boolean = false

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() updatedUserEvent = new EventEmitter<void>();

  userDetailsForm!: FormGroup;

  protected readonly roles = roles;

  constructor(private readonly store: Store<AppState>) {
  }


  ngOnInit(): void {
    this.userDetailsForm = new FormGroup({
      email: new FormControl<string | undefined>(this.user?.email, [Validators.required, Validators.email]),
      firstName: new FormControl<string | undefined>(this.user?.firstName, [Validators.required, Validators.min(3)]),
      lastName: new FormControl<string | undefined>(this.user?.lastName, [Validators.required, Validators.min(3)]),
      role: new FormControl<string | undefined>(this.user?.role, [Validators.required]),
      status: new FormControl<boolean | undefined>(this.user?.status, [Validators.required]),
      createdAt: new FormControl<Date | null>(new Date(this.user?.createdAt as string), [Validators.required]),
    })
  }


  hideDialog() {
    this.visible = false
    this.visibleChange.emit(this.visible)
  }

  updateUser() {
    this.store.dispatch(UserDetailsActions.updateUser({
      user: {
        ...this.userDetailsForm.value,
        id: this.user?.id,
        createdAt: new Date(this.userDetailsForm.get('createdAt')?.value).toISOString()
      }
    }))
    this.hideDialog()
    this.updatedUserEvent.emit();
  }

}
