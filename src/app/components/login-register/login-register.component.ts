import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router, ActivatedRoute} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit {

  firstName= new FormControl('', [Validators.required]);
  lastName= new FormControl("", [Validators.required]);
  email= new FormControl("", [Validators.required]);
  username= new FormControl("", Validators.required);
  password=new FormControl("", [Validators.required]);

  registrationForm = new FormGroup({
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    userName: this.username,
    password: this.password
  })
  loginForm = new FormGroup({
    username: this.firstName,
    password: this.password
  })

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private userService: UserService) { }

  ngOnInit(): void {}

//Register user
  onSave(): void {
    this.router.navigate([`/components/login-register/${this.registrationForm}`])
  }
//Login user
  onSubmit(): void {
    this.router.navigate([`/components/login-register/${this.loginForm}`])
  }



}
