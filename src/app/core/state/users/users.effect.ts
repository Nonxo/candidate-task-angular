import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {UserService} from "../../service/user.service";
import {UserDetailsActions, UsersPageActions} from "./users.action";
import {catchError, exhaustMap, map, of, tap } from "rxjs";

@Injectable()
export class UsersEffects {

  constructor(private readonly actions$: Actions, private readonly userService: UserService) {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersPageActions.loadUsers),
      exhaustMap(() => this.userService.fetchAllUsers()
        .pipe(
          map((users) => UsersPageActions.loadUsersSuccess({users})),
          catchError((error) => of(UsersPageActions.loadUsersFailure({error})))
        )
      )
    )
  );

  // Effect to persist users list gotten from API to sessionStorage
  persistUsers$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UsersPageActions.loadUsersSuccess),
        tap(({ users }) => {
          this.userService.setUsersInSessionStorage(users)
        })
      ),
    { dispatch: false }
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserDetailsActions.updateUser),
      exhaustMap(({ user }) => this.userService.updateUser(user)
        .pipe(
          map((user) => UserDetailsActions.updateUserSuccess({ user })),
          catchError((error) => of(UserDetailsActions.updateUserFailure({ error })))
        )
      )
    )
  );
}
