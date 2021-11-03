import { Component, Input, OnInit } from '@angular/core';
import {Post} from "../../classes/Post";
import POSTS  from "src/app/POSTS"

@Component({
  selector: 'app-related-users',
  templateUrl: './related-users.component.html',
  styleUrls: ['./related-users.component.css']
})
export class RelatedUsersComponent implements OnInit {

  @Input('posts')
  posts: Post[] = []; 
  postsMockData: Post[] = POSTS; 

  populatePosts(): Post[]
  {
    this.posts = []; 
    for (let i = 0; i < 3; i++)
    {
      this.posts.push(this.postsMockData[i]); 
    }
    return this.posts; 
  }

  


  constructor() { }

  ngOnInit(): void {
  }

}


