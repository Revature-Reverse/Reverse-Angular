import { Injectable } from '@angular/core';

import {FormGroup} from "@angular/forms";
import {User} from "../user";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: User[] = []; // empty user repository, try to populate by hardcoding or importing a list
  currentUser?: User; // user currently logged in

  constructor (private httpClient: HttpClient){
  }

  userRegistration(user: User){
    //user-registration must match in back-end
        return this.httpClient.post<User>("localhost:8080/user-registration", user);
  }

  //user-login must match in back-end
  userLogin(user: User){
    this.currentUser=user;
    this.users.push(user);
    console.log(this.currentUser);
    console.log(this.users)
    return this.httpClient.post<User>("localhost:8080/user-login", user);
  }

  //user-login must match in back-end
  resetPassword(user: User){
    return this.httpClient.post<User>("localhost:8080/reset-password", user);
  }
}
