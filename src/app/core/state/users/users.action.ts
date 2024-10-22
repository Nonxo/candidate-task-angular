import {createActionGroup, emptyProps, props} from "@ngrx/store";
import {User} from "./users.model";

export const UsersPageActions = createActionGroup({
  source: 'Users Page',
  events: {
    'Load Users': emptyProps(),
    'Load Users Success': props<{ users: User[] }>(),
    'Load Users Failure': props<{ error: string }>(),
    'Filter Users': props<{ keyword: string }>(),
    'Pagination Changed': props<{ page: number; offset: number }>(),
  }
});


export const UserDetailsActions = createActionGroup({
  source: 'User Details',
  events: {
    'Select User': props<{ userId: string }>(),
    'Update User': props<{ user: User }>(),
    'Update User Success': props<{ user: User }>(),
    'Update User Failure': props<{ error: string }>(),
  }
})
