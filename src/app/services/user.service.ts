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
  currentUser: User | undefined = undefined; // user currently logged in

  constructor(private httpClient: HttpClient) {
  }

  userRegistration(user: User) {
    //user-registration must match in back-end
    this.users.push(user);
    console.log("Registering User to database.");
    console.log(this.users);

    return of(this.users);

    // return this.httpClient.post<User>("localhost:8080/user-registration", user);
  }

  //user-login must match in back-end
  userLogin(user: User) {
    this.currentUser = this.users.find((dbUser) => dbUser.userName === user.userName && dbUser.password === user.password);

    if (this.currentUser) {
      console.log("Logging in User.");
      sessionStorage.setItem('token', JSON.stringify(this.currentUser));
      return of(this.currentUser);

      //return this.httpClient.post<User>("localhost:8080/user-login", user);
    } else {
      throw new Error("User not found.");
    }
  }

  getUserById(userId : number) {
    let user : User | undefined = this.users.find((dbUser) => dbUser.id === userId);
    if (this.currentUser) {
      return of(user);
    } else {
      throw new Error("User not found.");
    }
  }

  // //user-login must match in back-end
  // resetPassword(user: User){
  //   let user : User | undefined = this.user;
  //
  //
  //   return this.httpClient.post<User>("localhost:8080/reset-password", user);
  // }
}

