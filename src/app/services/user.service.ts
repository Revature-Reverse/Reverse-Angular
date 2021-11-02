import { Injectable } from '@angular/core';

import {FormGroup} from "@angular/forms";
import {User} from "../user";
import {HttpClient} from "@angular/common/http";
import { of } from "rxjs"

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: User[] = [
    {
      id: 1,
      firstName: "Timothy",
      lastName: "Harper",
      email: "lee@leeharper.dev",
      userName: "leeharper",
      password: "passwordharper"
    },
    {
      id: 2,
      firstName: "Paxton",
      lastName: "Plum",
      email: "paxton@plum.dev",
      userName: "paxtonplum",
      password: "passwordplum"
    },
    {
      id: 3,
      firstName: "Jerry",
      lastName: "Zheng",
      email: "jerry@zheng.dev",
      userName: "jerryzheng",
      password: "passwordjerry"
    },
  ]; // empty user repository, try to populate by hardcoding or importing a list
  currentUser?: User; // user currently logged in

  constructor (private httpClient: HttpClient){
  }

  userRegistration(user: User){
    //user-registration must match in back-end
    this.users.push(user);
    console.log("Registering User to database.");
    console.log(this.users);

    return of(this.users);

    // return this.httpClient.post<User>("localhost:8080/user-registration", user);
  }

  //user-login must match in back-end
  userLogin(user: User){
    this.currentUser=user;
    console.log("Logging in User.");
    console.log(this.users);
    sessionStorage.setItem('token', JSON.stringify(this.currentUser));
    return of(this.currentUser);

    //return this.httpClient.post<User>("localhost:8080/user-login", user);
  }

  //user-login must match in back-end
  resetPassword(user: User){


    return this.httpClient.post<User>("localhost:8080/reset-password", user);
  }
}


