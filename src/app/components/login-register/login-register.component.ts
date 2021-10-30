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

  // firstName= new FormControl('', [Validators.required]);
  // lastName= new FormControl("", [Validators.required]);
  // email= new FormControl("", [Validators.required]);
  // username= new FormControl("", Validators.required);
  // password=new FormControl("", [Validators.required]);
  //
  // registrationForm = new FormGroup({
  //   firstName: this.firstName,
  //   lastName: this.lastName,
  //   email: this.email,
  //   userName: this.username,
  //   password: this.password
  // })
  // loginForm = new FormGroup({
  //   username: this.firstName,
  //   password: this.password
  // })





  registrationForm = this.fb.group({
    id: [],
    userName: [null, [Validators.required]],
    firstName: [null, [Validators.required]],
    lastName: [null, [Validators.required]],
    password: [null, Validators.minLength(8), Validators.maxLength(15)],
    email: ['', [Validators.minLength(5), Validators.maxLength(30), Validators.email]],
  });

  loginForm = this.fb.group({
    userName: [null, [Validators.required]],
    password: [null, [Validators.required]],
  });


  user: DummyUsers= new class implements DummyUsers {
    email: string | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    password: string | undefined;
    userName: string | undefined;
  }();

  constructor(private userService: UserService,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {}



  public userLogin(){
    //this.userService.userLogin(this.user);
  }
  public userRegistration(){
    this.userService.userRegistration(this.user)
      .subscribe( data => {
        alert("User created successfully.");
        this.router.navigate(['/login']);
      });;
  }




}
