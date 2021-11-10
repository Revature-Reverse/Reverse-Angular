import { Injectable } from '@angular/core';

import {FormGroup} from "@angular/forms";
import {User} from "../classes/user";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable, of} from "rxjs"
import { Router } from '@angular/router';
import USERS from "../USERS";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users?: User[];
  baseUrl: string = `/backend/`;
  branches:any[];
  genders:any[];

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
     this.genders=resp;
      console.log(this.genders);
    });
   this.getBranchesList().toPromise().then(resp =>{
     this.branches=resp;
     console.log(this.branches);
   });;
    this.getUserById(1).toPromise().then(resp =>{
      console.log("get user by id 1");
      console.log(resp);
    });
  }

  userRegistration(user: User) {
    let gindex = user.gender;
    user.gender = this.genders[gindex-1];
    let bindex = user.branch;
    user.branch = this.branches[bindex-1];
    user.profilePicture = null;
    //console.log(user)
    //user-registration must match in back-end
    console.log("Registering User to database.");
    //console.log(this.users);
    return this.httpClient.post<User>(this.baseUrl+"users/register", user,this.httpOptions);
  }

  //user-login must match in back-end
  userLogin(user: User) {
    return this.httpClient.post<User>(this.baseUrl+"users/login", user,this.httpOptions);

    //console.log(user)
    //let finduser = this.users.find((dbUser) => dbUser.userName === user.userName && dbUser.password === user.password);
    //if (finduser){
    //  this.currentUserSubject.next(finduser);
    //}
    //if (this.currentUserValue) {
    //  console.log("Logging in User.");
    //  sessionStorage.setItem('currentUser', JSON.stringify(this.currentUserValue));
    //  sessionStorage.setItem('token', "testtoken");
//
    //  console.log(this.currentUser)
//
    //} else {
    //  throw new Error("User not found.");
    //}
  }
  logout(){
    sessionStorage.clear();
  }

  userUpdate(user: User): Observable<User> {
    console.log(user)
    let gindex = user.gender;
    user.gender = this.genders[gindex-1];
    let bindex = user.branch;
    user.branch = this.branches[bindex-1];
    return this.httpClient.patch<User>(this.baseUrl+"users/updateUser", user);
  }

  getUserById(userId : number) {
    //let user : User | undefined = this.users.find((dbUser) => dbUser.id === userId);

    return this.httpClient.get<User>(this.baseUrl+"users/"+userId, this.httpOptions);

  }
  getUserByUsername(username : string) {
    //let user : User | undefined = this.users.find((dbUser) => dbUser.id === userId);

    return this.httpClient.get<User>(this.baseUrl+"users/user/"+username, this.httpOptions);

  }
  getBranchesList() {
    return this.httpClient.get<any>(this.baseUrl+"lists/locations", this.httpOptions);

  }
  getGendersList() {
    return this.httpClient.get<any>(this.baseUrl+"lists/genders", this.httpOptions);

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
