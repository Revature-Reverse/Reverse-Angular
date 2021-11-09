import { TestBed } from '@angular/core/testing';

import { CommentService } from './comment.service';
import POSTS from "../POSTS";
import {Post} from "../classes/Post";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {HttpClient} from "@angular/common/http";

describe('CommentService', () => {
  let service: CommentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        CommentService
      ]
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
