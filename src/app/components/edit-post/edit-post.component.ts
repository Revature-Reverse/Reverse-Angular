import { Post } from 'src/app/classes/Post';
import { Component, OnInit } from '@angular/core';
import POSTS from '../../POSTS';
import { User } from '../../classes/user';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
})
export class EditPostComponent implements OnInit {
  medium: any;
  post!: Post;
  title!: String;
  body!: String;

  constructor() {}

  ngAfterViewInit() {
    this.medium = new MediumEditor('.editable', {
      toolbar: {
        static: true,
        sticky: true,
        updateOnEmptySelection: true,
      },
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    let user: User = {
      id: 1,
      userName: 'timothyharper',
      firstName: 'Timothy',
      lastName: 'Harper',
    };

    this.post = {
      id: POSTS.length + 1,
      title: this.title,
      body: this.medium.getContent(),
      poster: user,
    };
    console.log(this.post);
  }
}
