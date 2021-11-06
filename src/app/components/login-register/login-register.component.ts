import {
  AfterContentChecked,
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router, ActivatedRoute} from "@angular/router";
import {UserService} from "../../services/user.service";
import {User} from "../../user";
import {MatTabGroup} from "@angular/material/tabs";

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit,AfterContentChecked{

  selectedIndex?:number;
  branch_selected = "1";
  sex_selected = "login_option1";
  loginForm = this.fb.group({
    userName : ["", [Validators.required]],
    password : ["", [Validators.required]],
  })

  registrationForm = this.fb.group({
    //id = [],
    firstName : [null, [Validators.required]],
    lastName : [null, [Validators.required]],
    email : ['', [Validators.minLength(5), Validators.maxLength(30), Validators.email]],
    userName : [null, [Validators.required]],
    password : [null, Validators.minLength(8)],
    confirm_password : [null, Validators.minLength(8)],
    gender: [null, [Validators.required]],
    branch: [null, [Validators.required]]

  });

  resetPasswordForm = this.fb.group({
    userName : ["", [Validators.required]],
    password : ["", Validators.minLength(8)],
  })
  user: User = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    userName: '',
    gender: "",
    branch: "",
    birthdate: new Date(2000,0,1)
  };



  constructor(private userService: UserService,
              private router: Router,
              private fb: FormBuilder){}

  ngOnInit(): void {
    if(this.router.url=="/register"){
      this.selectedIndex=0;
    } else{
      this.selectedIndex=1;
    }


  }
  ngAfterContentChecked(): void {


  }


  logout() {
    this.userService.logout();
    window.location.href="";
  }
  loginclick(event:any){
    history.pushState({}, "Reverse Login", "login");
    this.selectedIndex=1;

  }
  registerclick(event:any){
    history.pushState({}, "Reverse Register", "register");
    this.selectedIndex=0;
  }

  public userLogin(){
    this.userService.userLogin(this.loginForm.value).subscribe( data => {
      alert("User logged in successfully.");
      window.location.href= "";
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
  // public resetPassword(){
  //   this.userService.resetPassword(this.resetPasswordForm.value).subscribe( data => {
  //       alert("Password reset successful.");
  //       //this.router.navigate(['/home']);
  //     }, error => {alert("Reset password failed: " + error.message);}
  //   )
  // }
}
