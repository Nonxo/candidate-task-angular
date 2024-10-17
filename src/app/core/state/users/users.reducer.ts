import {createReducer, on} from "@ngrx/store";
import {User, UsersState} from "./users.model";
import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";
import {UserDetailsActions, UsersPageActions} from "./users.action";

export const userFeatureKey = 'users';

export const adapter: EntityAdapter<User> = createEntityAdapter<User>();

export const initialState: UsersState = adapter.getInitialState({
  selectedUserId: null,
  loading: false,
  error: null
})


export const usersReducer = createReducer(
  initialState,
  on(UsersPageActions.loadUsersSuccess, (state, {users}) => adapter.setAll(users, {
    ...state,
    loading: false
  })),

  on(UsersPageActions.loadUsersFailure, (state, {error}) => ({
    ...state,
    loading: false,
    error
  })),

  on(UsersPageActions.filterUsers, (state) => ({
    ...state,
  })),

  on(UserDetailsActions.selectUser, (state, {userId}) => ({
    ...state,
    selectedUserId: userId
  })),

  on(UserDetailsActions.updateUserSuccess, (state, {user}) =>
    adapter.updateOne(
      { id: user.id, changes: user }, {
        ...state,
        selectedUserId: user.id
      }))
);
