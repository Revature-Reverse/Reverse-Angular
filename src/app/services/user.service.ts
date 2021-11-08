import { Injectable } from '@angular/core';

import {FormGroup} from "@angular/forms";
import {User} from "../user";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, of} from "rxjs"
import { Router } from '@angular/router';
import USERS from "../USERS";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: User[] = USERS;

  // empty user repository, try to populate by hardcoding or importing a list

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private httpClient: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(<string>sessionStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  userRegistration(user: User) {
    console.log(user)

    //user-registration must match in back-end
    this.users.push(user);
    console.log("Registering User to database.");
    console.log(this.users);

    return of(this.users);

    // return this.httpClient.post<User>("localhost:8080/user-registration", user);
  }

  //user-login must match in back-end
  userLogin(user: User) {
    console.log(user)
    let finduser = this.users.find((dbUser) => dbUser.userName === user.userName && dbUser.password === user.password);
    if (finduser){
      this.currentUserSubject.next(finduser);
    }
    if (this.currentUserValue) {
      console.log("Logging in User.");
      sessionStorage.setItem('currentUser', JSON.stringify(this.currentUserValue));
      sessionStorage.setItem('token', "testtoken");

      return this.currentUser;

      //return this.httpClient.post<User>("localhost:8080/user-login", user);
    } else {
      throw new Error("User not found.");
    }
  }
  logout(){
    sessionStorage.clear();
  }

  userUpdate(user: User): Observable<User> {
    console.log(user)
    //return this.httpClient.post<User>("localhost:8080/user-login", user);
    return of (user);
  }

  getUserById(userId : number) {
    let user : User | undefined = this.users.find((dbUser) => dbUser.id === userId);
    console.log(this.currentUserValue);

    if (this.currentUserValue) {
      return of(user);
    } else {
      throw new Error("User not found.");
    }
  }
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  // //user-login must match in back-end
  // resetPassword(user: User){
  //   let user : User | undefined = this.user;
  //
  //
  //   return this.httpClient.post<User>("localhost:8080/reset-password", user);
  // }
}
