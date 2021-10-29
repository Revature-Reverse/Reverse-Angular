import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //dummy user
  private dummyUser: any = {
    firstname: '',
    lastname: '',
    email: '',
    username: '',
    password: '',
    email: '',
    level: 'Reporter'
  };



  // login(user): Observable<> { }
  //
  // save(user): Observable<> {  }

}
