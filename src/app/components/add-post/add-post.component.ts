import { Component, OnInit } from '@angular/core';
import * as MediumEditor from 'medium-editor';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from '../../classes/Post';
import { PostService } from '../../services/post.service';
import POSTS from '../../POSTS';
import { User } from '../../classes/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from 'src/app/services/notification.service';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
})
export class AddPostComponent implements OnInit {
  medium: any;
  postform!: FormGroup;
  post!: Post;
  title!: string;

  constructor(
    private userService: UserService,

    private postService: PostService,
    private formBuilder: FormBuilder,
    private notify: NotificationService
  ) {}

    //the toaster
    // openToast(message: string, action: string)
    // {
    //   this._toast.open(message, action, {duration: 2500, verticalPosition:'top', panelClass:['login-toast', 'register-toast']});
    // }

  ngAfterViewInit() {
    this.medium = new MediumEditor('.editable', {
      toolbar: {
        static: true,
        sticky: true,
        updateOnEmptySelection: true,
      },
    });
  }

  ngOnInit(): void {
    this.postform = this.formBuilder.group({
      content: ['', [Validators.required]],
    });
  }

  get f() {
    return this.postform.controls;
  }

  onSubmit() {
    let user = this.userService.currentUserValue.id;
    this.post = {

      title: this.title,
      body: this.medium.getContent(),
      posterId: user,
    };

    this.postService
    .savePost(this.post)
    .toPromise()
    .then(
      (res: any) => {
        console.log(res);
      },
      (error) => {
        this.notify.openToast('Please fill out all required fields.', "");
      }
    );
    // .catch((err) => {
    //   console.log('Please fill out all required fields.');
    // });
  }

  ngOnChanges(change: any) {
    if (change.variable && change.variable.currentValue && this.medium) {
      this.medium.setContent(change.variable.currentValue);
    }
  }
}
