import {ApplicationConfig} from "@angular/core";
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";
import {provideRouter} from "@angular/router";
import {routes} from "./app-routes";
import {provideHttpClient} from "@angular/common/http";
import {provideStore} from "@ngrx/store";
import {userFeatureKey, usersReducer} from "./core/state/users/users.reducer";
import {provideEffects} from "@ngrx/effects";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideEffects([]),
    provideStore({ [userFeatureKey]: usersReducer }),
  ]
}
