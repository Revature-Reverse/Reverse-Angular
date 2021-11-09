import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router, ActivatedRoute} from "@angular/router";
import {UserService} from "../../services/user.service";
import {User} from "../../classes/user";
import {passwordValidator} from "../password-validator";

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
    userName : [null, [Validators.required]],
    password : [null, Validators.minLength(8)],
    confirm_password : [null, Validators.minLength(8)],
    gender: [null, [Validators.required]],
    branch: [null, [Validators.required]],
    birthdate: [null, [Validators.required]]
  },
    {validators: passwordValidator()});


  constructor(   private router: Router,
                 private fb: FormBuilder,
                 private activatedRoute: ActivatedRoute,
                 private userService: UserService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
    this.userService.getUserById(parseInt(params.id)).subscribe(user => this.user = user);
    this.user_profile_edit_form.patchValue(this.user);
  }
  )}

  saveUser() {
        this.user = { ...this.user, ...this.user_profile_edit_form.value };

      this.userService.userUpdate(this.user)
        .subscribe( data => {
          alert("User updated successfully.");
        }, error => { alert("Could not create a user: " + error.message);
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
