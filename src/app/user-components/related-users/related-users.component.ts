import { Component, Input, OnInit } from '@angular/core';
import { User } from "../../classes/user";
import POSTS  from "src/app/USERS"
import USERS from "src/app/USERS";

@Component({
  selector: 'app-related-users',
  templateUrl: './related-users.component.html',
  styleUrls: ['./related-users.component.css']
})
export class RelatedUsersComponent implements OnInit {

  @Input('users')
  users: User[] = [];
  usersMockData: User[] = USERS;

  populateUsers(): User[]
  {
    this.users = [];
    for (let i = 0; i < this.usersMockData.length; i++)
    {
      this.users.push(this.usersMockData[i]);
    }
    return this.users;
  }




  constructor() { }

  ngOnInit(): void {
  }

}


