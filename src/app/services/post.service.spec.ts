import { TestBed } from '@angular/core/testing';

import { PostService } from './post.service';
import {Post} from "../classes/Post";

fdescribe('PostService', () => {
  let service: PostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
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
    let post : Post = {
      id: 4,
      content: "<h3>I got it working!</h3><p>But now there are more issues.</p>",
      user_id: 1,
    }
    let posts : Post[] = [];

    let oldPostsLength : number = service.posts.length;

    service.savePost(post).subscribe(dbPosts => posts = dbPosts);

    expect(posts.length).toEqual(oldPostsLength+1);
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
    let post : Post = {
      id: 2,
      content: "<h3>I'm not sure I see the advantage of Angular over AngularJS</h3><p>Is there any advantage? Angular" +
        " seems like AngularJS with extra steps</p><p>EDIT: Sorry, my mistake. I confused AngularJS with JQuery. </p>",
      user_id: 4,
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

  /**
   *
   * Test: (PostService) #getRecentPosts should retrieve a collection of recent posts.
   * Purpose: Tests to see if recent posts can be retrieved through the service.
   *
   **/
  it("#getRecentPosts should retrieve a collection of recent posts", () => {
    let posts : Post[] = [];

    service.getRecentPosts().subscribe(dbPosts => posts = dbPosts);

    expect(posts.length).toEqual(5);
  });
});
