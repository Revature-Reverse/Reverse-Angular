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