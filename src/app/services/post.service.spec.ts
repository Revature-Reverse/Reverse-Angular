import { TestBed } from '@angular/core/testing';

import { PostService } from './post.service';
import {Post} from "../classes/Post";
import {User} from "../user";
import {HttpClientModule} from "@angular/common/http";

describe('PostService', () => {
  let service: PostService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
    });
    service = TestBed.inject(PostService);
  });

  /**
   *
   * Test: (PostService) should be created.
   * Purpose: Tests to see if the service can be loaded.
   *
   */
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /**
   *
   * Test: (PostService) #savePost should save a post.
   * Purpose: Tests to see if a post can be added through the service.
   *
   */
  it("#savePost should save a post", () => {
    let user : User = {
      id: 1,
      firstName: "Timothy",
      lastName: "Harper",
      email: "lee@leeharper.dev",
      userName: "leeharper",
      password: "passwordharper",
      gender: 0,
      branch: 1,
      birthdate: new Date(2000,0,1)
    };
    let post : Post = {
      id: 6,
      title: "test",
      body: "<h3>I got it working!</h3><p>But now there are more issues.</p>",
      poster: user
    }
    let newPost : Post | undefined;

    service.savePost(post).subscribe(dbPost => newPost = dbPost);

    expect(newPost).toEqual(post);
  });

  /**
   *
   * Test: (PostService) #deletePost should delete a post.
   * Purpose: Tests to see if a post can be deleted through the service.
   *
   */
  it("#deletePost should delete a post", () => {
    let deletedPostId : number = 4;
    let posts : Post[] = [];

    service.deletePost(deletedPostId).subscribe(dbPosts => posts = dbPosts);

    expect(posts.length).toEqual(service.posts.length);
  });

  /**
   *
   * Test: (PostService) #getPost should retrieve a post.
   * Purpose: Tests to see if a post can be retrieved through the service.
   *
   */
  it("#getPost should retrieve a post", () => {
    let retrievedPostId = 1;
    let post : Post | undefined;

    service.getPost(retrievedPostId).subscribe(dbPost => post = dbPost);

    expect(post).not.toBeUndefined();
    // @ts-ignore
    expect(post.id).toEqual(retrievedPostId);
  });

  /**
   *
   * Test: (PostService) #updatePost should update a post in data storage.
   * Purpose: Tests to see if a post can be updated through the service.
   *
   **/
  it("#updatePost should update a post in data storage", () => {
    let user : User = {
      id: 3,
      firstName: "Julie",
      lastName: "Harper",
      email: "jharper@leeharper.dev",
      userName: "juelieharper",
      password: "passwordjulie",
      gender: 1,
      branch: 1,
      birthdate: new Date(1994,4,23)
    };
    let post : Post = {
      id: 2,
      title: "title",
      body: "<h3>I'm not sure I see the advantage of Angular over AngularJS</h3><p>Is there any advantage? Angular" +
        " seems like AngularJS with extra steps</p><p>EDIT: Sorry, my mistake. I confused AngularJS with JQuery. </p>",
      poster: user
    };

    let updatedPost : Post | undefined;

    service.updatePost(post).subscribe(dbPost => updatedPost = dbPost);

    expect(post).not.toBeUndefined();

    // @ts-ignore
    expect(post).toEqual(updatedPost);
  });

  /**
   *
   * Test: (PostService) #getPostsByUser should retrieve a collection of posts.
   * Purpose: Tests to see if the posts of a user can be retrieved through the service.
   *
   **/
  it("#getPostsByUser should retrieve a collection of posts by the user.", () => {
    let userId = 3;
    let posts : Post[] = [];

    service.getPostsByUser(userId).subscribe(dbPosts => posts = dbPosts);

    expect(posts.length).toEqual(2);
  });

  // /**
  //  *
  //  * Test: (PostService) #getRecentPosts should retrieve a collection of recent posts.
  //  * Purpose: Tests to see if recent posts can be retrieved through the service.
  //  *
  //  **/
  // it("#getRecentPosts should retrieve a collection of recent posts", () => {
  //   let posts : Post[] = [];
  //
  //   service.getRecentPosts().subscribe(dbPosts => posts = dbPosts);
  //
  //   expect(posts.length).toEqual(6);
  // });
});
