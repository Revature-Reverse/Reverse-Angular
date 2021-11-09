import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Comment} from "../classes/Comment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  baseUrl: string = `http://3.91.248.52/backend/`;

  constructor(
    private httpClient : HttpClient
  ) { }

  public createComment(comment : Comment) : Observable<Comment> {
    return this.httpClient.post<Comment>(`${this.baseUrl}posts/comments/add`, comment);
  }

  public getComment(commentId : number) : Observable<Comment> {
    return this.httpClient.get<Comment>(`${this.baseUrl}posts/comments/${commentId}`);
  }

  public updateComment(comment : Comment) : Observable<Comment> {
    return this.httpClient.patch<Comment>(`${this.baseUrl}backend/comments/edit`, comment);
  }

  public deleteComment(commentId : number) : Observable<Comment> {
    return this.httpClient.delete<Comment>(`${this.baseUrl}backend/posts/comments/${commentId}`);
  }
}
