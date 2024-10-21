import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import {Observable, of, throwError} from 'rxjs';
import { UsersEffects } from './users.effect';
import { UsersPageActions } from './users.action';
import { UserService } from '../../service/user.service';
import {User} from "./users.model";
import { TestScheduler } from 'rxjs/testing';
import {TypedAction} from "@ngrx/store/src/models";

describe('UsersEffects', () => {

    let actions$: Observable<TypedAction<string>>;
    let effects: UsersEffects;
    let testScheduler: TestScheduler;
    let userService: UserService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                UsersEffects,
                UserService,
                provideMockActions(() => actions$),
                {
                    provide: UserService,
                    useValue: jasmine.createSpyObj('UserService', ['fetchAllUsers']),
                },
            ],
        });

        effects = TestBed.inject(UsersEffects);
        userService = TestBed.inject(UserService);
        testScheduler = new TestScheduler((actual, expected) => {
            expect(actual).toEqual(expected);
        });
    });

    it('should dispatch loadUsersSuccess action', () => {
        testScheduler.run(({ cold, hot, expectObservable }) => {

            const users: User[] = [
                { id: '1', firstName: 'John', lastName: 'Doe', email: 'john@example.com', status: true, role: 'admin', createdAt: '2022-01-01' },
                { id: '2', firstName: 'Jane', lastName: 'Jane Doe', email: 'jane@example.com', status: true, role: 'user', createdAt: '2022-01-02' }
            ];

            const action = UsersPageActions.loadUsers();
            const completion = UsersPageActions.loadUsersSuccess({users});

            spyOn(userService, 'fetchAllUsers').and.returnValue(of(users));

            actions$ = hot('-a', { a: action });

            const expected = cold('-b', { b: completion });


            expectObservable(effects.loadUsers$).toBe('--c', { c: expected });
            expect(userService.fetchAllUsers).toHaveBeenCalled();

        })
    });

    it('should dispatch loadUsersFailure action', () => {
        testScheduler.run(({ cold, hot, expectObservable}) => {
            const error = 'Some error occurred';
            const action = UsersPageActions.loadUsers();
            const completion = UsersPageActions.loadUsersFailure({ error });

            spyOn(userService, 'fetchAllUsers').and.returnValue(throwError(() => new Error(error)));

            actions$ = hot('-a', { a: action });

            const expected = cold('-b', { b: completion });

            // Expect that the effect will dispatch the failure action
            expectObservable(effects.loadUsers$).toBe('--c', { c: expected });
            expect(userService.fetchAllUsers).toHaveBeenCalled();

        })
    });
});
