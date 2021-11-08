import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostInFeedComponent } from './post-in-feed.component';

describe('PostInFeedComponent', () => {
  let component: PostInFeedComponent;
  let fixture: ComponentFixture<PostInFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostInFeedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostInFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
