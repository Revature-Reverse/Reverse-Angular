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
import {User} from "../../classes/user";
import {MatTabGroup} from "@angular/material/tabs";
import {MatSnackBar} from '@angular/material/snack-bar';
import {ViewEncapsulation} from '@angular/core';
import {passwordValidator} from "../../user-components/password-validator";
import { NotificationService } from 'src/app/services/notification.service';


@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit, AfterContentChecked {

  selectedIndex?: number;
  imageSrc!: string;

  loginForm = this.fb.group({
    userName: ["", [Validators.required]],
    password: ["", [Validators.required]],
  })

  registrationForm = this.fb.group({
    //id = [],
    firstName: [null, [Validators.required]],
    lastName: [null, [Validators.required]],
    email: ['', [Validators.minLength(5), Validators.maxLength(30), Validators.email]],
    userName: [null, [Validators.required]],
    password: [null, [Validators.minLength(8)]],
    confirm_password: [null, [Validators.minLength(8)]],
    gender: [null, [Validators.required]],
    branch: [null, [Validators.required]],
    dateOfBirth: [null, [Validators.required]]
    //profilepic: [null, [Validators.required]]

  }, {validators: passwordValidator()});

  resetPasswordForm = this.fb.group({
    userName: ["", [Validators.required]],
    password: ["", Validators.minLength(8)],
  })

  user: User = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    userName: '',
    gender: 0,
    branch: 0,
    dateOfBirth: new Date(2000, 0, 1)
  };


  constructor(private userService: UserService,
              private router: Router,
              private fb: FormBuilder,
              private notify: NotificationService) {
  }

  ngOnInit(): void {
    if (this.router.url == "/register") {
      this.selectedIndex = 0;
    } else {
      this.selectedIndex = 1;
    }


  }

  ngAfterContentChecked(): void {


  }


  logout() {
    this.userService.logout();
    window.location.href = "";
  }

  loginclick(event: any) {
    history.pushState({}, "Reverse Login", "login");
    this.selectedIndex = 1;

  }

  registerclick(event: any) {
    history.pushState({}, "Reverse Register", "register");
    this.selectedIndex = 0;
  }

  //the toaster
  // openToast(message: string, action: string) {
  //   this._toast.open(message, action, {
  //     duration: 2500,
  //     verticalPosition: 'top',
  //     panelClass: ['login-toast', 'register-toast']
  //   });
  // }

  public userLogin() {
    this.userService.userLogin(this.loginForm.value).toPromise().then((data)  => {
        console.log(data);
        sessionStorage.setItem("token", data);

        //alert("User logged in successfully.");
        //window.location.href= "";
        //this.router.navigate(['/home']);
      }, error => {
        this.notify.openToast("Login failed: Wrong username or password", "");
      }
    )
  }

  get f() {
    return this.registrationForm.controls;
  }

  public userRegistration() {
    console.log(this.f.dateOfBirth.value);
    //console.log(this.f.profilepic.value.files[0].name);
    //this.imageSrc= this.imageSrc.split(',')[1];
    //console.log(this.imageSrc);


    this.user = {...this.user, ...this.registrationForm.value};

    this.userService.userRegistration(this.user)
      .toPromise().then((data) => {
        this.notify.openToast("User created successfully.", "");
        //this.router.navigate(['/login']);
      }, error => {
        this.notify.openToast("Could not create a user: " + error.message, "");
      });

  }

  // public resetPassword(){
  //   this.userService.resetPassword(this.resetPasswordForm.value).subscribe( data => {
  //       alert("Password reset successful.");
  //       //this.router.navigate(['/home']);
  //     }, error => {alert("Reset password failed: " + error.message);}
  //   )
  // }
  onFileChange(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageSrc = reader.result as string;

        this.registrationForm.patchValue({
          fileSource: reader.result
        });

      };

    }
  }


}
