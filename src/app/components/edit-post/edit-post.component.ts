import { Post } from 'src/app/classes/Post';
import { Component, OnInit } from '@angular/core';
import POSTS from '../../POSTS';
import { User } from '../../classes/user';
import { NotificationService } from "../../services/notification.service";
import { FilterService } from "../../services/filter.service";

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
})
export class EditPostComponent implements OnInit {
  medium: any;
  post!: Post;
  title!: string;
  body!: string;

  constructor(
    private filterService : FilterService,
    private notify : NotificationService
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
    if (this.filterService.checkForProfanity(this.post.body) || this.filterService.checkForProfanity(this.post.title)) {
      this.notify.openToast("The post cannot contain profanity.", "");
    } else {
      console.log(this.post);
    }
  }
}
