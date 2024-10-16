import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../state/users/users.model";
import {environment} from "../../../environments/environment";


@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }

  fetchAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(environment.baseUrl + "/v1/employees/fetch");
  }
}
