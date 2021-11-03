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

  constructor(
    private postService: PostService,
    private formBuilder: FormBuilder
  ) {}

  ngAfterViewInit() {
    this.medium = new MediumEditor('.editable', {});
    // If you wish to add existing HTML into it, you can do it like this.
    this.medium.setContent('<h2>MediumEditor<h2>');
  }
  postform!: FormGroup;
  post!: Post;

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
      content: this.f.content.value,
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
