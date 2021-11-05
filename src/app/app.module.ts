import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginRegisterComponent } from './components/login-register/login-register.component';
import { UserComponent } from './components/user/user.component';
import { PostComponent } from './components/post/post.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { AngularMaterialModule } from './modules/angular-material/angular-material.module';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { UserPostListComponent } from './user-components/user-post-list/user-post-list.component';
import { UserDescriptionComponent } from './user-components/user-description/user-description.component';
import { RelatedUsersComponent } from './user-components/related-users/related-users.component';
import { RelatedPostsComponent } from './post-components/related-posts/related-posts.component';
import { PostInFeedComponent } from './post-components/post-in-feed/post-in-feed.component';
import { FeedComponent } from './post-components/feed/feed.component';
import { UserProfileEditComponent } from './user-components/user-profile-edit/user-profile-edit.component';
import {TokenInterceptor} from "./interceptors/token.interceptor";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginRegisterComponent,
    UserComponent,
    PostComponent,
    AddPostComponent,
    HomepageComponent,
    SidebarComponent,
    UserPostListComponent,
    UserDescriptionComponent,
    RelatedUsersComponent,
    RelatedPostsComponent,
    UserProfileEditComponent,
    PostInFeedComponent,
    FeedComponent,
    UserProfileEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    HttpClientModule,
    MatInputModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
