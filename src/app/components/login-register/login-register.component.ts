import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router, ActivatedRoute} from "@angular/router";
import {UserService} from "../../services/user.service";
import {DummyUsers} from "../../dummy-users";

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
  password = new FormControl("", [Validators.required, Validators.minLength(6)]);
  confirm_password = new FormControl("", [Validators.required]);

  registrationForm = new FormGroup({
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    userName: this.userName,
    password: this.password,
    confirm_password: this.confirm_password,
  })
  loginForm = new FormGroup({
    firstName: this.firstName,
    lastName: this.lastName,
  })

  // loginForm = this.fb.group({
  //   userName = ["", [Validators.required]],
  //   password = ["", Validators.minLength(8)],
  // })
  //
  // registrationForm = this.fb.group({
  //   //id = [],
  //   firstName = [null, [Validators.required]],
  //   lastName = [null, [Validators.required]],
  //   email = ['', [Validators.minLength(5), Validators.maxLength(30), Validators.email]],
  //   userName = [null, [Validators.required]],
  //   password = [null, Validators.minLength(8)],
  //   confirm_password = [null, Validators.minLength(8)],
  // });

  user: DummyUsers= new class implements DummyUsers {
    email: string | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    password: string | undefined;
    userName: string | undefined;
  }();

  constructor(private userService: UserService,
              private router: Router,
              private fb: FormBuilder){}

  ngOnInit(): void {}

  public userLogin(){
    this.userService.userLogin(this.user);
  }
  public userRegistration(){
    this.userService.userRegistration(this.user)
      .subscribe( data => {
        alert("User created successfully.");
        this.router.navigate(['/login']);
      });;
  }




}
