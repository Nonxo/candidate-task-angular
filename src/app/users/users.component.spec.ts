import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { UsersComponent } from './users.component';
import { User } from '../core/state/users/users.model';
import {selectFilteredUsers } from '../core/state/users/users.selector';
import {UserDetailsActions, UsersPageActions} from '../core/state/users/users.action';
import { MessageService } from 'primeng/api';
import {ToastModule} from "primeng/toast";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let store: MockStore;
  let messageService: jasmine.SpyObj<MessageService>;
  const initialState = { users: [] };

  beforeEach(() => {
    messageService = jasmine.createSpyObj('MessageService', ['add']);

    TestBed.configureTestingModule({
      imports: [UsersComponent, ToastModule, NoopAnimationsModule],
      providers: [
        provideMockStore({ initialState }),
        { provide: MessageService, useValue: messageService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadUsers action on initialization', () => {
    spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledWith(UsersPageActions.loadUsers());
  });

  it('should select filtered users from the store', () => {
    const mockUsers: User[] = [{ id: '1', firstName: 'User 1', lastName: 'Test', email: 'john@example.com', role: 'Admin', status: true, createdAt: '2022-01-01' }];
    store.overrideSelector(selectFilteredUsers, mockUsers);
    component.ngOnInit();
    component.users$?.subscribe(users => {
      expect(users).toEqual(mockUsers);
    });
  });

  it('should dispatch filterUsers action with the correct keyword', () => {
    spyOn(store, 'dispatch');
    const keyword = 'John';
    component.filterUsers(keyword);
    expect(store.dispatch).toHaveBeenCalledWith(UsersPageActions.filterUsers({ keyword }));
  });

  it('should dispatch selectUser action and show user details', () => {
    spyOn(store, 'dispatch');
    const mockUser: User = { id: '1', firstName: 'User 1', lastName: 'Test', email: 'john@example.com', role: 'Admin', status: true, createdAt: '2022-01-01' }
    component.viewUserDetails(mockUser);
    expect(store.dispatch).toHaveBeenCalledWith(UserDetailsActions.selectUser({ userId: mockUser.id }));
    expect(component.modalVisible).toBeTrue();
  });
});
