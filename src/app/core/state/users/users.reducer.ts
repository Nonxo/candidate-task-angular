import {createReducer} from "@ngrx/store";
import {User} from "./users.model";

export const userFeatureKey = 'users';

export const initialState: User[] = []

export const usersReducer = createReducer(initialState)
