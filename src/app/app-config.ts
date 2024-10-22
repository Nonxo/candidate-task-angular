import {ApplicationConfig} from "@angular/core";
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";
import {provideRouter} from "@angular/router";
import {routes} from "./app-routes";
import {provideHttpClient} from "@angular/common/http";
import {provideStore} from "@ngrx/store";
import {userFeatureKey, usersReducer} from "./core/state/users/users.reducer";
import {provideEffects} from "@ngrx/effects";
import {UsersEffects} from "./core/state/users/users.effect";
import {UserService} from "./core/service/user.service";
import {provideStoreDevtools} from "@ngrx/store-devtools";

export const appConfig: ApplicationConfig = {
  providers: [
    UserService,
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideStore({ [userFeatureKey]: usersReducer }),
    provideEffects(UsersEffects),
    provideStoreDevtools()
  ]
}
