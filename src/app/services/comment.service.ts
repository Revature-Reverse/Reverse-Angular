import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Comment} from "../classes/Comment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  baseUrl: string = `http://localhost:8000/`;

  constructor(
    private httpClient : HttpClient
  ) { }

  public createComment(comment : Comment) : Observable<Comment> {
    return this.httpClient.post<Comment>(`${this.baseUrl}comments/comment`, comment);
  }


  public deleteComment(commentId : number) : Observable<Comment> {
    return this.httpClient.delete<Comment>(`${this.baseUrl}comments/${commentId}`);
  }
}
