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
  users: EntityState<User>;  // Global state slice for users
}


export interface UsersState extends EntityState<User> {
  selectedUserId: string | null;
  loading: boolean;
  error: string | null;
}
