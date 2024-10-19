import {createFeatureSelector, createSelector} from "@ngrx/store";
import {adapter, userFeatureKey } from "./users.reducer";
import {User, UsersState} from "./users.model";

const emptyUser: User = {
  id: '',
  name: '',
  email: '',
  status: false,
  role: '',
  createdAt: ''
}

export const selectUsersState = createFeatureSelector<UsersState>(userFeatureKey)

const { selectAll, selectEntities } = adapter.getSelectors();

export const selectUsersEntities = createSelector(selectUsersState, selectEntities);

export const selectAllUsers = createSelector(selectUsersState, selectAll);

export const selectCurrentUserId = createSelector(selectUsersState, (state) => state.selectedUserId);

export const selectCurrentUser = createSelector(
  selectUsersEntities,
  selectCurrentUserId,
  (userEntities, userId) => userId ? userEntities[userId] : emptyUser
);
