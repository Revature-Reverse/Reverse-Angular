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
      this.userService.getUserById(parseInt(params.id)).toPromise().then(user => {
        this.user = user
        console.log("user services get user"+this.user)
        this.postService.getPostsByUser(this.user.id).toPromise().then(posts =>{
          this.posts = posts.sort((a, b) => (a.created < b.created) ? 1-1: -1)
          console.log(posts)

        })
      });


    })
  }
}



