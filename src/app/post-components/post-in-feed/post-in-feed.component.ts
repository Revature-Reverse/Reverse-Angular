import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../classes/Post";

@Component({
  selector: 'app-post-in-feed',
  templateUrl: './post-in-feed.component.html',
  styleUrls: ['./post-in-feed.component.css']
})
export class PostInFeedComponent implements OnInit {

  @Input()
  post! : Post;

  like_count : number = 15;
  comment_count : number = 12;

  constructor() { }

  ngOnInit(): void {
  }

}
