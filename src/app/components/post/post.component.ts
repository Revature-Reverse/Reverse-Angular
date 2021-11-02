import { Component, OnInit } from '@angular/core';
import { PostService} from "../../services/post.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import POSTS from 'src/app/POSTS';
import {Post} from "src/app/classes/Post";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  postform!:FormGroup;
  post!:Post;

  constructor(private postService:PostService,
              private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.postform = this.formBuilder.group({
      content : ["", [Validators.required]]
    })
  }
  get f() { return this.postform.controls; }

  onSubmit(){
    this.post = {
      id: POSTS.length+1,
      content: this.f.content.value,
      user_id: 1

    }
    this.postService.savePost(this.post).toPromise()
      .then((res:any) =>{
        console.log(res);
      }, (error)=>{
        alert("Please fill out all required fields.");
      });

   }

}
