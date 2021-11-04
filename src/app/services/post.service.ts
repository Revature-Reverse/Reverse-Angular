import { Injectable } from '@angular/core';
import POSTS from '../POSTS';
import { Observable } from "rxjs";
import { of } from "rxjs"
import {Post} from "../classes/Post";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  posts : Post[] = POSTS;


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
  savePost(post : Post) : Observable<Post[]> {
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
  deletePost(id : number) : Observable<Post[]> {
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
  getPost(id : number) : Observable<Post | undefined> {
    return of(this.posts.find((post : Post) => post.id === id));
  }


  /***
   *
   * Function: PostService.updatePost(updatedPost : any).
   * Purpose: Updates a post that is stored in data storage.
   * Precondition: A valid data storage is set up.
   * Postcondition: The post object in data storage is updated.
   *
   * @param updatedPost The post object being updated.
   *
   */
  updatePost(updatedPost : any) : Observable<Post | undefined> {
    this.posts = this.posts.map(post => {
      if (post.id === updatedPost.id) {
        return updatedPost;
      } else {
        return post;
      }
    });

    return of(this.posts.find((post : Post) => post.id === updatedPost.id));
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
  getPostsByUser(userId : number) : Observable<Post[]> {
    this.posts = this.posts.filter(post => post.user_id === userId);

    return of(this.posts);
  }

  /***
   *
   * Function: PostService.getRecentPosts().
   * Purpose: Retrieves an array of the most recent posts made.
   * Precondition: A valid data storage is set up.
   * Postcondition: N/A.
   *
   */
  getRecentPosts() : Observable<Post[]> {
    return of(this.posts);
  }
}
