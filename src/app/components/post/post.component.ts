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

  constructor(private postService:PostService) {

  }

  ngOnInit(): void {

  }

}
