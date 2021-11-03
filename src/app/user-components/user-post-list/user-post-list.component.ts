import {Component, Input, OnInit} from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import {Post} from "../../classes/Post";

@Component({
  selector: 'app-user-post-list',
  templateUrl: './user-post-list.component.html',
  styleUrls: ['./user-post-list.component.css']
})
export class UserPostListComponent implements OnInit {
  time = new Date().toLocaleTimeString(); 
  @Input('posts')
  posts: Post[] =[];

  like_count: number = 20; 
  post_count: number = 1; 

  constructor() { }

  ngOnInit(): void {
  }

  getDate()
  {
    let date: Date = new Date(); 
    return date.toLocaleDateString('en', { year: 'numeric', month: 'short', day: '2-digit'}); 
  }
}
