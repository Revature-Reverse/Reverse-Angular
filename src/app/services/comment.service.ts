import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Comment} from "../classes/Comment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  baseUrl: string = `/backend/`;

  constructor(
    private httpClient : HttpClient
  ) { }

  /***
   *
   * Function: CommentService.createComment(comment : Comment)
   * Purpose: Saves a new post comment to data storage.
   * Precondition: A valid data storage is set up.
   * Postcondition: The comment is saved to data storage.
   *
   * @param comment The comment object that is being saved.
   *
   */
  public createComment(comment : Comment) : Observable<Comment> {
    return this.httpClient.post<Comment>(`${this.baseUrl}comments/comment`, comment);
  }


  /***
   *
   * Function: CommentService.deleteComment(commentId : number)
   * Purpose: delete a post comment from data storage.
   * Precondition: A valid data storage is set up.
   * Postcondition: The comment is removed from data storage.
   *
   * @param commentId The commentid for the comment that is being removed.
   *
   */
  public deleteComment(commentId : number) : Observable<Comment> {
    return this.httpClient.delete<Comment>(`${this.baseUrl}comments/${commentId}`);
  }
}
