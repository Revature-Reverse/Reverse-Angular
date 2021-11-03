import { Component, OnInit } from '@angular/core';
import * as MediumEditor from 'medium-editor';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from '../../classes/Post';
import { PostService } from '../../services/post.service';
import POSTS from '../../POSTS';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
})
export class AddPostComponent implements OnInit {
  medium: any;
  postform!: FormGroup;
  post!: Post;
  title!: String;

  constructor(
    private postService: PostService,
    private formBuilder: FormBuilder
  ) {}

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
    this.post = {
      id: POSTS.length + 1,
      title: this.title,
      content: this.medium.getContent(),
      user_id: 1,
    };
    this.postService
      .savePost(this.post)
      .toPromise()
      .then(
        (res: any) => {
          console.log(res);
        },
        (error) => {
          alert('Please fill out all required fields.');
        }
      );
  }

  ngOnChanges(change: any) {
    if (change.variable && change.variable.currentValue && this.medium) {
      this.medium.setContent(change.variable.currentValue);
    }
  }
}
