import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedUsersComponent } from './related-users.component';

describe('RelatedUsersComponent', () => {
  let component: RelatedUsersComponent;
  let fixture: ComponentFixture<RelatedUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatedUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatedUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
