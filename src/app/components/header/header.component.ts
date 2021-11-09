import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../classes/user";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: User;

  constructor(private userService: UserService,private router:Router) {
    this.user = this.userService.currentUserValue;
  }

  ngOnInit(): void {
  }
  logout() {
    this.userService.logout();
    window.location.href="";
  }

}
