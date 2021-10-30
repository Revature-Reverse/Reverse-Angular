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

  /***
   *
   * Function: PostService.deletePost(id : number).
   * Purpose: Deletes a post with a given id from data storage.
   * Precondition: A valid data storage is set up.
   * Postcondition: The post is deleted to data storage.
   *
   * @param id The id of the post object that is being deleted.
   *
   */
  deletePost(id : number) : Observable<any> {
    this.posts = this.posts.filter((post) => post.id !== id);

    return of(this.posts);
  }

  /***
   *
   * Function: PostService.getPost(id : number).
   * Purpose: Retrieves a post with a given id from data storage.
   * Precondition: A valid data storage is set up.
   * Postcondition: N/A.
   *
   * @param id The id of the post object that is being retrieved.
   *
   */
  getPost(id : number) : Observable<any> {
    return of(this.posts.find((post) => post.id === id));
  }

  /***
   *
   * Function: PostService.getPostsByUser(userId : number).
   * Purpose: Retrieves an array of posts made by the user with the associated ID.
   * Precondition: A valid data storage is set up.
   * Postcondition: N/A.
   *
   * @param userId The ID of the user who's posts are being retrieved.
   *
   */
  getPostsByUser(userId : number) : Observable<any> {
    this.posts = this.posts.filter(post => post.user_id === userId);

    return of(this.posts);
  }
}
