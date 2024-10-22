import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import {Observable} from 'rxjs';
import { UsersEffects } from './users.effect';
import {UserDetailsActions, UsersPageActions} from './users.action';
import { UserService } from '../../service/user.service';
import {User} from "./users.model";
import { TestScheduler } from 'rxjs/testing';
import {TypedAction} from "@ngrx/store/src/models";

describe('UsersEffects', () => {

    let actions$: Observable<TypedAction<string>>;
    let effects: UsersEffects;
    let testScheduler: TestScheduler;
    let userService: jasmine.SpyObj<UserService>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                UsersEffects,
                provideMockActions(() => actions$),
                {
                    provide: UserService,
                    useValue: jasmine.createSpyObj('UserService', ['fetchAllUsers', 'updateUser']),
                },
            ],
        });

        effects = TestBed.inject(UsersEffects);
        userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
        testScheduler = new TestScheduler((actual, expected) => {
            expect(actual).toEqual(expected);
        });
    });

    it('should dispatch loadUsersSuccess action', () => {
        testScheduler.run(({ cold, hot, expectObservable }:{ cold: ([key]: string, value: Record<string, User[]>) => Observable<any>, hot: any, expectObservable: any}) => {

            const users: User[] = [
                { id: '1', firstName: 'John', lastName: 'Doe', email: 'john@example.com', status: true, role: 'admin', createdAt: '2022-01-01' },
                { id: '2', firstName: 'Jane', lastName: 'Jane Doe', email: 'jane@example.com', status: true, role: 'user', createdAt: '2022-01-02' }
            ];

            const action = UsersPageActions.loadUsers();
            actions$ = hot('-a', { a: action });

            userService.fetchAllUsers.and.returnValue(cold('--a|', { a: users }));

            const completion = UsersPageActions.loadUsersSuccess({ users });
            expectObservable(effects.loadUsers$).toBe('---c', {
                c: completion
            });

        })
    });

    it('should dispatch loadUsersFailure action', () => {
        testScheduler.run(({ cold, hot, expectObservable}) => {
            const error = 'Some error occurred';
            const action = UsersPageActions.loadUsers();
            actions$ = hot('-b', { b: action });
            const completion = UsersPageActions.loadUsersFailure({ error });

            userService.fetchAllUsers.and.returnValue(cold('--#|', {}, error));


            expectObservable(effects.loadUsers$).toBe('---c', { c: completion });

        })
    });

    it('should dispatch updateUserSuccess action', () => {
        testScheduler.run(({ cold, hot, expectObservable }: { cold: any, hot: any, expectObservable: any }) => {
            const user: User = { id: '1', firstName: 'Johnny', lastName: 'Doey', email: 'john@email.com', status: true, role: 'admin', createdAt: '2022-01-01' };
            const action = UserDetailsActions.updateUser({ user });
            actions$ = hot('-b', { b: action });
            const completion = UserDetailsActions.updateUserSuccess({ user });

            userService.updateUser.and.returnValue(cold('--b|', { b: user }));


            expectObservable(effects.updateUser$).toBe('---c', { c: completion });
        })
    });
});
