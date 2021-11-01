import { Injectable } from '@angular/core';

import {FormGroup} from "@angular/forms";
import {User} from "../user";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor (private httpClient: HttpClient){
  }

  public userRegistration(user: User){
    //user-registration must match in back-end
        return this.httpClient.post<User>("localhost:8080/user-registration", user);
  }
  //user-login must match in back-end
  public userLogin(user: User){
    return this.httpClient.post<User>("localhost:8080/user-login", user);
  }


  //user-login must match in back-end
  public resetPassword(user: User){
    return this.httpClient.post<User>("localhost:8080/reset-password", user);
  }
}

class User {
  declare userid1: number;
  declare userid2: number;
  username: string;
  password: string;
  username2: string;
  password2: string;
  constructor(userid1: number, userid2: number, username: string, password: string, username2: string, password2: string) {
    this.username = username;
    this.password = password;
    this.username2 = username2;
    this.password2 = password2;
  }
}

let arr: User[] = new Array();
arr.push({
  userid1: 1,
  userid2: 1,
  username: "frontend",
  password: "frontend dev",
  username2: "frontend 2",
  password2: "frontend dev 2"
});
arr.push(new User(1, 2, "frontend", "frontend dev", "frontend 2", "frontend dev 2"));
