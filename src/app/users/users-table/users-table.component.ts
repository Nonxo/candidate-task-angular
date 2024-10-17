import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
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
import {User} from "../../core/state/users/users.model";
import {FormsModule} from "@angular/forms";
import {SliderModule} from "primeng/slider";

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [CommonModule, TableModule, InputTextModule, TagModule, SelectModule, MultiSelectModule, ProgressBarModule, ButtonModule, IconFieldModule, InputIconModule, FormsModule, SliderModule, NgOptimizedImage],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersTableComponent implements OnInit {

  @Input() users!: User[] | null


  ngOnInit(): void {
  }

  getStatusStyle(status: boolean) {
    if (status) {
      return 'success'
    } else {
      return 'danger'
    }
  }

}
