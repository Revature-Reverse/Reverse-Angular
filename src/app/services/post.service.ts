import { Injectable } from '@angular/core';
import POSTS from '../POSTS';
import { Observable } from "rxjs";
import { of } from "rxjs"

@Injectable({
  providedIn: 'root'
})
export class PostService {

  posts : any[] = POSTS;

  constructor() {

  }

  /***
   *
   * Function: PostService.savePost(post : any).
   * Purpose: Saves a given post to data storage.
   * Precondition: A valid data storage is set up.
   * Postcondition: The post is saved to data storage.
   *
   * @param post The post object that is being saved.
   *
   */
  savePost(post : any) : Observable<any> {
    this.posts.push(post);

    return of(this.posts);
  }
}
