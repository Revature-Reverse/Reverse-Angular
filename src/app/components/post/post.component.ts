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
import {NotificationService} from "../../services/notification.service";
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
  current?: User;

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
              private fb: FormBuilder,
              private notify: NotificationService) {
  }

  ngOnInit(): void {
    this.current=this.userService.currentUserValue;
    this.activatedRoute.params.subscribe(params => {
      // get post from post service using url param
      this.postService.getPost(parseInt(params.id)).toPromise().then(post => {
        this.post = post
        this.post.comments = post.comments.sort(((a, b) => (a.created < b.created) ? 1 : -1))
        this.postId = post.id
        this.postimages = post.images
        console.log(post.likes)
        post.images.forEach((item:any)=>{
          console.log(item)
          // imageobject used for displaying image list and full screen view of images
          let singleimageobject= {
            image: item.url,
            title: item.filename
          }
          this.imageObject.push(singleimageobject);
        });
        // if user liked the post, update like button css color
        post.likes.forEach((item:any)=>{
          console.log(item)
          if(item==this.userService.currentUserValue.id){
            this.likedpost=true;
            console.log("true");
          }
        });
        console.log(this.post)
        // get user object of the post author
        this.userService.getUserById(this.post?.poster.id).toPromise().then(user => this.user = user);

      });

      console.log(this.post);
    })
  }

  get f() {
    return this.commentform.controls;
  }

  // for ng image full view
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

  // send comment value to comment service
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
        //if comment success, update post object with new comments
        this.postService.getPost(parseInt(this.post.id)).toPromise().then(post => {
          this.post = post
          this.post.comments = post.comments.sort(((a, b) => (a.created < b.created) ? 1 : -1))
        });
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
    if(!this.likedpost){
      this.postService.likePost(like).toPromise().then(
        resp=>{
          this.postService.getPost(parseInt(this.post.id)).toPromise().then(post => {
            this.post = post
            this.likedpost= true
          });
        }
      ),((error: any)=>console.log(error));
    } else{
      this.postService.unlikePost(this.postId,this.current.id).toPromise().then(
        resp=>{
          this.postService.getPost(parseInt(this.post.id)).toPromise().then(post => {
            this.post = post
            this.likedpost= false

          });
        }
      ),((error: any)=>console.log(error));
    }
  }
  deletecomment(id:number){
    this.commentService.deleteComment(id).toPromise().then(
      resp=>{
        this.notify.openToast("Successfully deleted comment" ,"")

        this.postService.getPost(parseInt(this.post.id)).toPromise().then(post => {
          this.post = post
          this.post.comments = post.comments.sort(((a, b) => (a.created < b.created) ? 1 : -1))
        });
      }
    ),((error: any)=>console.log(error));
  }
  deletepost(postid:number){
    this.postService.deletePost(postid).toPromise().then(
      resp=>{
        this.notify.openToast("Post deleted successfully.", "");
        setTimeout(() =>{
          window.location.href="users/"+this.current.id;
        },1000);
      }
    ),((error: any)=>console.log(error));
  }
  editpost(postid:number){
    window.location.href="posts/"+postid+"/edit";
  }
}
