import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router, ActivatedRoute} from "@angular/router";
import {UserService} from "../../services/user.service";
import {User} from "../../user";

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit {


  loginForm = this.fb.group({
    userName : ["", [Validators.required]],
    password : ["", Validators.minLength(8)],
  })

  registrationForm = this.fb.group({
    //id = [],
    firstName : [null, [Validators.required]],
    lastName : [null, [Validators.required]],
    email : ['', [Validators.minLength(5), Validators.maxLength(30), Validators.email]],
    userName : [null, [Validators.required]],
    password : [null, Validators.minLength(8)],
    confirm_password : [null, Validators.minLength(8)],
  });

  resetPasswordForm = this.fb.group({
    userName : ["", [Validators.required]],
    password : ["", Validators.minLength(8)],
  })
  user: User = {
    email: undefined,
    firstName: undefined,
    lastName: undefined,
    password: undefined,
    userName: undefined
  };

  constructor(private userService: UserService,
              private router: Router,
              private fb: FormBuilder){}

  ngOnInit(): void {}

  public userLogin(){
    this.userService.userLogin(this.loginForm.value).subscribe( data => {
      alert("User logged in successfully.");
        //this.router.navigate(['/home']);
    }, error => {alert("Login failed: " + error.message);}
    )
  }
  public userRegistration(){
    this.user = { ...this.user, ...this.registrationForm.value };

    this.userService.userRegistration(this.user)
      .subscribe( data => {
        alert("User created successfully.");
        //this.router.navigate(['/login']);
      }, error => { alert("Could not create a user: " + error.message);
  });

}
  public resetPassword(){
    this.userService.resetPassword(this.resetPasswordForm.value).subscribe( data => {
        alert("Password reset successful.");
        //this.router.navigate(['/home']);
      }, error => {alert("Reset password failed: " + error.message);}
    )
  }
}
