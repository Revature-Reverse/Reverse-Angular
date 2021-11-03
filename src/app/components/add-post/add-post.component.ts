import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Post} from "../../classes/Post";
import {PostService} from "../../services/post.service";
import POSTS from "../../POSTS";

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

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
