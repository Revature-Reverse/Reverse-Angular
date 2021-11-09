import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { PostService} from "../../services/post.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import POSTS from 'src/app/POSTS';
import {Post} from "src/app/classes/Post";
import {UserService} from "../../services/user.service";
import {ActivatedRoute} from "@angular/router";
import {User} from "../../classes/user";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  date:string="";
  post?: any;
  user?: User;
  content?:any;

  constructor(private activatedRoute:ActivatedRoute,
              private postService:PostService,
              private userService:UserService) {
    this.date = this.getDate();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.postService.getPost(parseInt(params.id)).subscribe(post => this.post = post);
      if (this.post){
        this.userService.getUserById(this.post?.user_id).subscribe(user => this.user = user);
        this.loadHtml();
      }

      console.log(this.post);
    })
  }
  getDate(){
    let date1:Date = new Date();
    return date1.toLocaleDateString('en', { year: 'numeric', month: 'short', day: '2-digit' });

  }

  loadHtml(){
    this.content= this.post.content;

  }
}
