import { Injectable } from '@angular/core';

import {FormGroup} from "@angular/forms";
import {User} from "../user";
import {HttpClient} from "@angular/common/http";
import USERS from "../USERS";
import {Observable, of} from "rxjs";
import {Post} from "../classes/Post";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: User[] = USERS;

  constructor (private httpClient: HttpClient){
  }

  userRegistration(user: User){
    //user-registration must match in back-end
        return this.httpClient.post<User>("localhost:8080/user-registration", user);
  }

  //user-login must match in back-end
  userLogin(user: User){
    return this.httpClient.post<User>("localhost:8080/user-login", user);
  }

  //user-login must match in back-end
  resetPassword(user: User){
    return this.httpClient.post<User>("localhost:8080/reset-password", user);
  }

  getByUserId(id: number) : Observable<User> {
    const users = this.users.filter(user => user.id === id);
    return of(users[0]);
  }
}
