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
  // baseurl for production server
  baseUrl: string = `/backend/`;
  branches:any[];
  genders:any[];

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  // set http options for cors
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),
  };

  constructor(private httpClient: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(<string>sessionStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();

    // get list of gender values from db
   this.getGendersList().toPromise().then(resp =>{
     this.genders=resp;
      //console.log(this.genders);
    });

    // get list of branches values from db
    this.getBranchesList().toPromise().then(resp =>{
     this.branches=resp;
     //console.log(this.branches);
   });;

   // test backend connection by getting 1 user from db
    this.getUserById(1).toPromise().then(resp =>{
      //console.log("get user by id 1");
      //console.log(resp);
    });
  }

  /***
   *
   * Function: UserService.userRegistration(user : User).
   * Purpose: Saves a new user to data storage.
   * Precondition: A valid data storage is set up.
   * Postcondition: The user is saved to data storage
   *
   * @param user The user object that is being saved.
   *
   */
  userRegistration(user: User) {
    let gindex = user.gender;
    user.gender = this.genders[gindex-1];
    let bindex = user.branch;
    user.branch = this.branches[bindex-1];
    user.profilePicture = null;
    //console.log(user)
    //user-registration must match in back-end
    //console.log("Registering User to database.");
    //console.log(this.users);
    return this.httpClient.post<User>(this.baseUrl+"users/register", user,this.httpOptions);
  }

  /***
   *
   * Function: UserService.userLogin(user : User).
   * Purpose: Send credentials to backend for verification.
   * Precondition: A valid data storage is set up.
   * Postcondition: The user is saved to data storage
   *
   * @param user The user object that is being saved.
   *
   */
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
  /***
   *
   * Function: UserService.logout().
   * Purpose: clear session storage so no user information is saved.
   * Precondition: User information and token was saved in session storage.
   * Postcondition: The user is logged out and session is cleared
   *
   */
  logout(){
    sessionStorage.clear();
  }

  /***
   *
   * Function: UserService.userUpdate(user: User)
   * Purpose: Send credentials to backend for verification.
   * Precondition: A valid data storage is set up.
   * Postcondition: The user is saved to data storage
   *
   * @param user The user object that is being saved.
   *
   */
  userUpdate(user: User): Observable<User> {
    //console.log(user)
    let gindex = user.gender;
    user.gender = this.genders[gindex-1];
    let bindex = user.branch;
    user.branch = this.branches[bindex-1];
    return this.httpClient.patch<User>(this.baseUrl+"users/updateUser", user);
  }

  /***
   *
   * Function: UserService.getUserById(userId: number)
   * Purpose: get a user object from backend with specified id
   * Precondition: JWT is setup and user id is given.
   * Postcondition: The user object is returned as reponse
   *
   * @param userID The userid of user that we want to look up
   *
   */
  getUserById(userId : number) {
    //let user : User | undefined = this.users.find((dbUser) => dbUser.id === userId);

    return this.httpClient.get<User>(this.baseUrl+"users/"+userId, this.httpOptions);

  }
  /***
   *
   * Function: UserService.getUserByUsername(username : string)
   * Purpose: get a user object from backend with specified username
   * Precondition: JWT is setup and username is given.
   * Postcondition: The user object is returned as reponse
   *
   * @param username The username of user that we want to look up
   *
   */
  getUserByUsername(username : string) {
    //let user : User | undefined = this.users.find((dbUser) => dbUser.id === userId);

    return this.httpClient.get<User>(this.baseUrl+"users/user/"+username, this.httpOptions);

  }

  // get list of branches (for registration form and user edit)
  getBranchesList() {
    return this.httpClient.get<any>(this.baseUrl+"lists/locations", this.httpOptions);

  }

  // get list of genders (for registration form and user edit)
  getGendersList() {
    return this.httpClient.get<any>(this.baseUrl+"lists/genders", this.httpOptions);

  }
  // get current user information
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
