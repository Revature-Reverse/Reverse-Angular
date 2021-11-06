import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router, ActivatedRoute} from "@angular/router";
import {UserService} from "../../services/user.service";
import {User} from "../../user";

@Component({
  selector: 'app-user-profile-edit',
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.css']
})
export class UserProfileEditComponent implements OnInit {

  branch_selected = "branch_option1";
  gender_selected = "gender_option1";
  user?: User;

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
  });

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
}
