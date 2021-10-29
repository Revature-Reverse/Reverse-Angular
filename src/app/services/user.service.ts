import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
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
