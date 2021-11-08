import { Injectable } from '@angular/core';

import {FormGroup} from "@angular/forms";
import {User} from "../user";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable, of} from "rxjs"
import { Router } from '@angular/router';
import USERS from "../USERS";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users?: User[];
  baseUrl: string = `http://3.91.248.52/backend/`;

  // empty user repository, try to populate by hardcoding or importing a list

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),
  };

  constructor(private httpClient: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(<string>sessionStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
   this.getGendersList().toPromise().then(resp =>{
      console.log("list of genders");
      console.log(resp);
    });
   this.getBranchesList().toPromise().then(resp =>{
     console.log("list of Branches");
     console.log(resp);
   });;
    this.getUserById(1).toPromise().then(resp =>{
      console.log("get user by id 1");
      console.log(resp);
    });
  }

  userRegistration(user: User) {
    //console.log(user)
    //user-registration must match in back-end
    this.users.push(user);
    console.log("Registering User to database.");
    //console.log(this.users);

    return this.httpClient.post<User>("${this.baseUrl}/users/register", user);
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

      console.log(this.currentUser)

      return this.httpClient.post<User>("${this.baseUrl}/users/login", user);
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
    //let user : User | undefined = this.users.find((dbUser) => dbUser.id === userId);

    return this.httpClient.get<User>(this.baseUrl+"/users/"+userId, this.httpOptions);

  }
  getBranchesList() {
    return this.httpClient.get<User>(this.baseUrl+"lists/genders", this.httpOptions);

  }
  getGendersList() {
    return this.httpClient.get<User>(this.baseUrl+"lists/locations", this.httpOptions);

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
