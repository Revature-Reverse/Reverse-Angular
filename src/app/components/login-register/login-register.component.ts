import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})

export class LoginRegisterComponent implements OnInit {

  firstName = new FormControl("", [Validators.required]);
  lastName = new FormControl("", [Validators.required]);
  email = new FormControl("", [Validators.required, Validators.email]);
  userName = new FormControl("", [Validators.required]);
  password = new FormControl("", [Validators.required]);
  login_username = new FormControl("", [Validators.required]);
  login_password = new FormControl("", [Validators.required]);
  confirm_password = new FormControl("", [Validators.required]);


  constructor() { }

  ngOnInit(): void {
  }

}
