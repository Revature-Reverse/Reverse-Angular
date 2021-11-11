import { Post } from 'src/app/classes/Post';
import { Component, OnInit } from '@angular/core';
import POSTS from '../../POSTS';
import { User } from '../../classes/user';
import { NotificationService } from "../../services/notification.service";
import {ActivatedRoute} from "@angular/router";
import {PostService} from "../../services/post.service";

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
    private notify : NotificationService,
    private activatedRoute: ActivatedRoute,
    private postService: PostService

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
    this.activatedRoute.params.subscribe(params => {
      this.postService.getPost(parseInt(params.id)).toPromise().then(post => {
        console.log(post)
        this.post = post;
        this.title = post.title

        console.log(this.post);
        this.medium.setContent(this.post.body);

      })
    })
  }

  onSubmit() {
    this.post = {
      id: this.post.id,
      title: this.title,
      body: this.medium.getContent(),
      poster: this.post.poster
    };
    this.postService.updatePost(this.post).toPromise().then(resp=>{
      console.log(resp)
      this.notify.openToast("Successfully edited post" ,"")
      setTimeout(() =>{
        window.location.href= "posts/"+this.post.id;
      },1000);
    }, error => {
      this.notify.openToast("Could not edit post " ,"")
    });
  }
}
