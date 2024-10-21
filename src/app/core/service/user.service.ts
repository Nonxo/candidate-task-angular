import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {User} from "../state/users/users.model";
import {environment} from "../../../environments/environment";


@Injectable()
export class UserService {
  constructor(private readonly http: HttpClient) { }

  fetchAllUsers(): Observable<User[]> {
    const usersFromStorage = this.getUsersFromSessionStorage();
    if (usersFromStorage.length) {
      return of(usersFromStorage);
    }
    return this.http.get<User[]>(environment.baseUrl + "/v1/employees/fetch");
  }

  updateUser(user: User): Observable<User> {
    const users = this.getUsersFromSessionStorage();
    const updatedUsers = users.map((u: User) => (u.id === user.id ? user : u));
    this.setUsersInSessionStorage(updatedUsers);
    return of(user);
  }

  setUsersInSessionStorage(users: User[]): void {
    sessionStorage.setItem('users', JSON.stringify(users));
  }

  getUsersFromSessionStorage(): User[] {
    const users = sessionStorage.getItem('users');
    return users ? JSON.parse(users) : [];
  }
}
