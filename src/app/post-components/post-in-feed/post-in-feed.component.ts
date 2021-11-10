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

  constructor() { }

  ngOnInit(): void {
  }

}
