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
  postsSubscription! : Subscription;

  constructor(
    private postService : PostService
  ) { }

  ngOnInit(): void {
    this.postsSubscription = this.postService.getRecentPosts().subscribe(dbPosts => this.posts = dbPosts);
  }

}
