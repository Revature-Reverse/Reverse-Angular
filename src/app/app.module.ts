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
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { UserPostListComponent } from './user-components/user-post-list/user-post-list.component';
import { UserDescriptionComponent } from './user-components/user-description/user-description.component';
import { RelatedUsersComponent } from './user-components/related-users/related-users.component';

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
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
