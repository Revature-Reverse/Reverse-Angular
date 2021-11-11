import { Injectable } from '@angular/core';
import POSTS from '../POSTS';
import { Observable } from "rxjs";
import { of } from "rxjs"
import {Post} from "../classes/Post";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  baseUrl: string = `/backend/`;

  posts : Post[];
  userToken! : string | null;
  recentposts:any[];
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),
  };

  constructor(
    private httpClient : HttpClient
  ) {
    //this.getRecentPosts().toPromise().then(resp =>{
    //  this.recentposts=resp;
     // console.log(this.recentposts);
    //});
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
  savePost(post : Post) : Observable<Post> {
    console.log(post)
    this.getUserToken();
    console.log(this.userToken)
    return this.httpClient.post<Post>(this.baseUrl+'posts/create', post,this.httpOptions);
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

    return this.httpClient.delete<Post[]>(this.baseUrl+`posts/delete/`+id,this.httpOptions);
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
    return this.httpClient.get<Post>(this.baseUrl+`posts/`+id,this.httpOptions);
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
    console.log(updatedPost)
    /***
    * this.posts = this.posts.map(post => {
    *  if (post.id === updatedPost.id) {
    *    return updatedPost;
    *  } else {
    *    return post;
    *  }
    *});
    * */

    return this.httpClient.patch<Post>(this.baseUrl+"posts/edit", updatedPost,this.httpOptions);
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

    return this.httpClient.get<Post[]>(this.baseUrl+'posts/byUser/'+userId,this.httpOptions);
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
    return this.httpClient.get<Post[]>(this.baseUrl+"posts/recent/10",this.httpOptions);
  }

  private getUserToken() : void {
    this.userToken = sessionStorage.getItem('token');
  }

  /***
   *
   * Function: PostService.likePost(like:any)
   * Purpose: like a post in the db
   * Precondition: pass a like object with postid and userid
   * Postcondition: post is liked and user is added to the list of like activities of the post
   *
   */
  likePost(like:any):Observable<any>{
    return this.httpClient.post<Post[]>(this.baseUrl+"posts/like",like,this.httpOptions);
  }

  /***
   *
   * Function: PostService.unlikePost(postId:number,userId:number)
   * Purpose: unlike a post in the db
   * Precondition: pass postid and userid
   * Postcondition: post is unliked and user is removed to the list of like activities of the post
   *
   */
  unlikePost(postId:number,userId:number):Observable<any>{
    return this.httpClient.delete<Post[]>(this.baseUrl+"posts/unlike/"+postId+"/"+userId,this.httpOptions);
  }
}
