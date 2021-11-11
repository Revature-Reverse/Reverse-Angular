import { Component, OnInit } from '@angular/core';
import {Post} from "../../classes/Post";
import {Subscription} from "rxjs";
import {PostService} from "../../services/post.service";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  posts! : Post[];

  constructor(
    private postService : PostService
  ) { }

  get userFromSession() {
    return sessionStorage.getItem('currentUser');
  }

  ngOnInit(): void {
    // get recent posts from backend
    this.postService.getRecentPosts().toPromise().then(dbPosts => {
      this.posts = dbPosts
      console.log(dbPosts)
    });
  }

}
