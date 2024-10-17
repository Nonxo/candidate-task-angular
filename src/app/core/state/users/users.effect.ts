import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {UserService} from "../../service/user.service";
import {UsersPageActions} from "./users.action";
import {catchError, exhaustMap, map, of, tap} from "rxjs";

@Injectable()
export class UsersEffects {

  constructor(private actions$: Actions, private readonly userService: UserService) {}

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
}
