import {EntityState} from "@ngrx/entity";

export interface User {
  id: string;
  name: string;
  email: string;
  status: boolean;
  role: string;
  createdAt: string;
}


export interface AppState {
  users: EntityState<User>;  // Global state slice for users
}


export interface UsersState extends EntityState<User> {
  selectedUserId: string | null;
  loading: boolean;
  error: string | null;
}
