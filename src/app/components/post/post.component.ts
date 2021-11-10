import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { PostService} from "../../services/post.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import POSTS from 'src/app/POSTS';
import {Post} from "src/app/classes/Post";
import {UserService} from "../../services/user.service";
import {ActivatedRoute} from "@angular/router";
import {User} from "../../classes/user";
import {CommentService} from "../../services/comment.service";
import {Comment} from "../../classes/Comment";
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  currentIndex: any = -1;
  showFlag: any = false;
  post?: any;
  user?: User;
  content?:any;
  likedpost?:boolean;
  commentbox:boolean=true;
  commentform = this.fb.group({
    commentbody: ["", [Validators.required]]
  })
  postimages?:any[];
  imageObject: Array<any> = [];
  postId?:number;
  constructor(private activatedRoute:ActivatedRoute,
              private postService:PostService,
              private userService:UserService,
              private commentService:CommentService,
              private fb: FormBuilder,) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.postService.getPost(parseInt(params.id)).toPromise().then(post => {
        this.post = post
        this.postId = post.id
        this.postimages = post.images
        console.log(post.likes)
        post.images.forEach((item:any)=>{
          console.log(item)
          let singleimageobject= {
            image: item.url,
            title: item.filename
          }
          this.imageObject.push(singleimageobject);
        });
        post.likes.forEach((item:any)=>{
          console.log(item)
          if(item==this.userService.currentUserValue.id){
            this.likedpost=true;
            console.log("true");
          }
        });
        console.log(this.post)
        this.userService.getUserById(this.post?.poster.id).toPromise().then(user => this.user = user);

      });

      console.log(this.post);
    })
  }

  get f() {
    return this.commentform.controls;
  }
  togglecommentbox(){
    this.commentbox= !this.commentbox;
  }
  showLightbox(index: any) {
    this.currentIndex = index;
    this.showFlag = true;
  }

  closeEventHandler() {
    this.showFlag = false;
    this.currentIndex = -1;
  }
  submitcomment(){
    console.log(this.f.commentbody.value)
    let comment:Comment = {
      userId:this.userService.currentUserValue.id,
      message:this.f.commentbody.value,
      postId:this.post.id
    }
    console.log(comment)
    this.commentService.createComment(comment).toPromise().then(
      resp=>{
        console.log(resp)
      }
    ),((error: any)=>console.log(error));
  }
  likepost(){
    let like = {
      likeId:
        {
          userId: this.userService.currentUserValue.id,
          postId: this.postId
        }
    }
    console.log(like)
    this.postService.likePost(like).toPromise().then(
      resp=>{
        console.log(resp)
      }
    ),((error: any)=>console.log(error));
  }
}
