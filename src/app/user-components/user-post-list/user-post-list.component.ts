import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../classes/Post";

@Component({
  selector: 'app-user-post-list',
  templateUrl: './user-post-list.component.html',
  styleUrls: ['./user-post-list.component.css']
})
export class UserPostListComponent implements OnInit {
  @Input('posts')
  posts: Post[] =[];

  constructor() { }

  ngOnInit(): void {
  }

}
