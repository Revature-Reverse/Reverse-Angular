import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router, ActivatedRoute} from "@angular/router";
import {UserService} from "../../services/user.service";
import {User} from "../../classes/user";
import {passwordValidator} from "../password-validator";
import {NotificationService} from "../../services/notification.service";

@Component({
  selector: 'app-user-profile-edit',
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.css']
})
export class UserProfileEditComponent implements OnInit {

  filename: any = "filename";
  branch_selected = "1";
  gender_selected = "M";
  user?: User;
  imageSrc!:string;

  user_profile_edit_form = this.fb.group({
    //id = [],
    firstName : [null, [Validators.required]],
    lastName : [null, [Validators.required]],
    email : ['', [Validators.minLength(5), Validators.maxLength(30), Validators.email]],
    username : [null, [Validators.required]],
    //password : [null, Validators.minLength(8)],
    //confirm_password : [null, Validators.minLength(8)],
    gender: [null, [Validators.required]],
    branch: [null, [Validators.required]],
    dateOfBirth: [null, [Validators.required]]
  },
    {validators: passwordValidator()});


  constructor(   private router: Router,
                 private fb: FormBuilder,
                 private activatedRoute: ActivatedRoute,
                 private userService: UserService,
                 private notify: NotificationService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.userService.getUserById(parseInt(params.id)).toPromise().then(user => {
      console.log(user)
      this.user = user;
      console.log(this.user);
      this.user_profile_edit_form.patchValue(this.user);
      this.user_profile_edit_form.patchValue({

        branch:this.user.branch.id.toString(),
        gender:this.user.gender.id.toString()


      });
      });
   }
  )}

  saveUser() {
        this.user = { ...this.user, ...this.user_profile_edit_form.value };
      console.log(this.user)
      this.userService.userUpdate(this.user)
        .toPromise().then( data => {
          this.notify.openToast("Successfully edited user information.","")
        this.userService.getUserById(this.user.id).toPromise().then(user => {
          console.log(user)
          this.user = user;
          sessionStorage.setItem("currentUser",JSON.stringify(this.user))
          window.location.href="users/"+this.user.id+"/edit";
        });

        }, error => { alert("Could not update a user: " + error.message);
        });
  }

  onFileChange(event: any) {
    const reader = new FileReader();

    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageSrc = reader.result as string;

        this.user_profile_edit_form.patchValue({
          fileSource: reader.result
        });

      };

    }
  }
}
