import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PostService} from "../../services/post.service";
import {Post} from "../../classes/Post";
import {User} from "../../user";
import {UserService} from "../../services/user.service";


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  posts: Post[] = [];
  user?: User;

  constructor(private activatedRoute:ActivatedRoute,
              private postService: PostService,
              private userService:UserService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.postService.getPostsByUser(parseInt(params.id)).subscribe(post => this.posts = post);
      this.userService.getByUserId(parseInt(params.id)).subscribe(user => this.user = user);
    })
  }
}



