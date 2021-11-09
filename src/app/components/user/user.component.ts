import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PostService} from "../../services/post.service";
import {Post} from "../../classes/Post";
import {User} from "../../classes/user";
import {UserService} from "../../services/user.service";


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  posts: Post[] = [];
  user?: User;
  editable?:Boolean;

  constructor(private activatedRoute:ActivatedRoute,
              private postService: PostService,
              private userService:UserService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      console.log(params.id)
      console.log(this.userService.currentUserValue.id)

      if(params.id == this.userService.currentUserValue.id){
        this.editable=true;
      }
      this.postService.getPostsByUser(parseInt(params.id)).subscribe(post => this.posts = post);
      this.userService.getUserById(parseInt(params.id)).subscribe(user => this.user = user);
    })
  }
}



