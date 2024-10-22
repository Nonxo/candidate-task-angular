import {
  selectAllUsers,
  selectCurrentUser,
  selectCurrentUserId,
  selectFilteredUsers,
  selectUsersEntities
} from "./users.selector";
import {UserState} from "./users.model";

describe('User Selectors', () => {
  const mockUsers = [
    { id: '1', firstName: 'Alan', lastName: 'Doe', email: 'alandoe@email.com', status: true, role: 'Software Engineer', createdAt: '2023-01-01' },
    { id: '2', firstName: 'Ben', lastName: 'Smith', email: 'bensmith@email.com', status: false, role: 'Scrum Master', createdAt: '2023-01-02' }
  ];

  const initialState: UserState = {
    ids: ['1', '2'],
    entities: {
      '1': mockUsers[0],
      '2': mockUsers[1]
    },
    selectedUserId: '1',
    filterByKeyword: '',
    error: null
  };

  it('should select the users entities', () => {
    const result = selectUsersEntities.projector(initialState);
    expect(result).toEqual(initialState.entities);
  });

  it('should select all users', () => {
    const result = selectAllUsers.projector(initialState);
    expect(result).toEqual(mockUsers);
  });

  it('should filter users by keyword', () => {
    let result = selectFilteredUsers.projector(mockUsers, '');
    expect(result).toEqual(mockUsers);

    result = selectFilteredUsers.projector(mockUsers, 'alan');
    expect(result).toEqual([mockUsers[0]]);

    result = selectFilteredUsers.projector(mockUsers, 'smith');
    expect(result).toEqual([mockUsers[1]]);

    result = selectFilteredUsers.projector(mockUsers, 'bensmith@email.com');
    expect(result).toEqual([mockUsers[1]]);

    result = selectFilteredUsers.projector(mockUsers, 'active');
    expect(result).toEqual([mockUsers[0]]);

    result = selectFilteredUsers.projector(mockUsers, 'inactive');
    expect(result).toEqual([mockUsers[1]]);
  });

  it('should select the current user id', () => {
    const result = selectCurrentUserId.projector(initialState);
    expect(result).toEqual('1');
  });

  it('should select the current user based on user id', () => {
    let result = selectCurrentUser.projector(initialState.entities, '1');
    expect(result).toEqual(mockUsers[0]);

    result = selectCurrentUser.projector(initialState.entities, '2');
    expect(result).toEqual(mockUsers[1]);

    // No selected user
    result = selectCurrentUser.projector(initialState.entities, null);
    expect(result).toEqual({
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      status: false,
      role: '',
      createdAt: ''
    });
  });
});
