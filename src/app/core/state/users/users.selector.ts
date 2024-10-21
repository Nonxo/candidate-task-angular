import {createFeatureSelector, createSelector} from "@ngrx/store";
import {adapter, userFeatureKey } from "./users.reducer";
import {User, UserState } from "./users.model";
import { getStatusKey } from "../../utils/func.util";

const emptyUser: User = {
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  status: false,
  role: '',
  createdAt: ''
}

const selectUsersState = createFeatureSelector<UserState>(userFeatureKey)

const { selectAll, selectEntities } = adapter.getSelectors();

export const selectUsersEntities = createSelector(selectUsersState, selectEntities);

export const selectAllUsers = createSelector(selectUsersState, selectAll);

const selectFilterKeyword = createSelector(selectUsersState, (state) => state.filterByKeyword);

export const selectFilteredUsers = createSelector(
  selectAllUsers,
  selectFilterKeyword,
  (users, keyword) => {
    if (!keyword) return users;

    keyword = keyword.trim().toLowerCase();

    return users.filter((user) => {

     return user.firstName.toLowerCase().includes(keyword)
      || user.lastName.toLowerCase().includes(keyword)
      || user.email.toLowerCase().includes(keyword)
      || user.status === getStatusKey(keyword)
    })
  }
)

export const selectCurrentUserId = createSelector(selectUsersState, (state) => state.selectedUserId);

export const selectCurrentUser = createSelector(
  selectUsersEntities,
  selectCurrentUserId,
  (userEntities, userId) => userId ? userEntities[userId] : emptyUser
);
