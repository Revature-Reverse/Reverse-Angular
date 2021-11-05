import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../classes/Post";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  @Input()
  posts! : Post[];

  constructor() { }

  ngOnInit(): void {
  }

}
