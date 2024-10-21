import {EntityState} from "@ngrx/entity";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  status: boolean;
  role: string;
  createdAt: string;
}

export type Role = { label: string; value: string }


export interface AppState {
  users: UserState;  // Global state slice for users
}


export interface UserState extends EntityState<User> {
  selectedUserId: string | null;
  filterByKeyword: string;
  loading: boolean;
  error: string | null;
}
