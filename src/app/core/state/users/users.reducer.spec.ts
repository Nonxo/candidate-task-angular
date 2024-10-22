import { User } from "./users.model";
import {UserDetailsActions, UsersPageActions} from "./users.action";
import {adapter, initialState, usersReducer} from "./users.reducer";

describe('Users Reducer', () => {
  const mockUsers: User[] = [
    { id: '1', firstName: 'User 1', lastName: 'Doe', email: 'user1@email.com', role: 'Business Analyst', status: true, createdAt: '2022-01-01'},
    { id: '2', firstName: 'User 2', lastName: 'Doe', email: 'user2@email.com', role: 'Product Manager', status: false, createdAt: '2022-01-02' }
  ];

  it('should return the initial state when an unknown action is dispatched', () => {
    const action = { type: 'Unknown'};
    const state = usersReducer(undefined, action);

    expect(state).toBe(initialState);
  });

  it('should handle loadUsersSuccess', () => {
    const action = UsersPageActions.loadUsersSuccess({ users: mockUsers });
    const state = usersReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      ...adapter.setAll(mockUsers, initialState)
    });
  });

  it('should handle loadUsersFailure', () => {
    const error = 'Failed to load users';
    const action = UsersPageActions.loadUsersFailure({ error });
    const state = usersReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      error
    });
  });

  it('should handle filterUsers', () => {
    const keyword = 'User 1';
    const action = UsersPageActions.filterUsers({ keyword });
    const state = usersReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      filterByKeyword: keyword
    });
  });

  it('should handle selectUser', () => {
    const userId = '1';
    const action = UserDetailsActions.selectUser({ userId });
    const state = usersReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      selectedUserId: userId
    });
  });

  it('should handle updateUserSuccess', () => {
    const updatedUser: User = { id: '1', firstName: 'Updated', lastName: 'User 1', email: 'updated1@example.com', role: 'Admin', status: true, createdAt: '2022-01-01' };
    const action = UserDetailsActions.updateUserSuccess({ user: updatedUser });
    const state = usersReducer({
      ...initialState,
      entities: { '1': mockUsers[0], '2': mockUsers[1] },
      ids: ['1', '2'],
      selectedUserId: '1'
    }, action);

    expect(state.entities['1']).toEqual(updatedUser);
    expect(state.selectedUserId).toEqual(updatedUser.id);
  });
});
