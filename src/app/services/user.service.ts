import { Injectable } from '@angular/core';

import {FormGroup} from "@angular/forms";
import {DummyUsers} from "../dummy-users";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor (private httpClient: HttpClient){

  }

  public userRegistration(user: DummyUsers){
    //standarize user-registration link with backend
        return this.httpClient.post<DummyUsers>("localhost:8080/user-registration", user);
  }
  public userLogin(user: DummyUsers){
    return this.httpClient.post<DummyUsers>("localhost:8080/user-login", user);
  }

}
