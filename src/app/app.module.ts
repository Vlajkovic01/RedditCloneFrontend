import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { PostsListComponent } from './components/posts-list/posts-list.component';
import {PostService} from "./service/post/post.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { PostItemComponent } from './components/post-item/post-item.component';
import { CommunitiesComponent } from './pages/communities/communities.component';
import { CommunitiesListComponent } from './components/communities-list/communities-list.component';
import { CommunityItemComponent } from './components/community-item/community-item.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthenticationService} from "./security/authentication/authentication.service";
import {TokenInterceptorService} from "./security/interceptor/token-interceptor.service";
import {JwtUtilsService} from "./security/authentication/jwt-utils.service";
import {CanActivateAuthGuard} from "./security/authentication/can-activate-auth.guard";
import {CanActivateAuthAdminGuard} from "./security/authentication/can-activate-auth-admin.guard";
import { CreateCommunityComponent } from './components/create-community/create-community.component';
import { CommunityComponent } from './pages/community/community.component';
import { CommunityDetailsComponent } from './components/community-details/community-details.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';
import { PostComponent } from './pages/post/post.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { CommentsListComponent } from './components/comments-list/comments-list.component';
import { CommentItemComponent } from './components/comment-item/comment-item.component';
import { CreateCommentComponent } from './components/create-comment/create-comment.component';
import { CreateCommentReplyComponent } from './components/create-comment-reply/create-comment-reply.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { EditPasswordComponent } from './components/edit-password/edit-password.component';
import { SuspendCommunityComponent } from './components/suspend-community/suspend-community.component';
import { EditCommunityComponent } from './components/edit-community/edit-community.component';
import { EditPostComponent } from './components/edit-post/edit-post.component';
import { SortPostsComponent } from './components/sort-posts/sort-posts.component';
import { SortPostsInCommunityComponent } from './components/sort-posts-in-community/sort-posts-in-community.component';
import { SortCommentComponent } from './components/sort-comment/sort-comment.component';
import { ReportPostComponent } from './components/report-post/report-post.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    NotFoundComponent,
    LoginComponent,
    RegisterComponent,
    PostsListComponent,
    PostItemComponent,
    CommunitiesComponent,
    CommunitiesListComponent,
    CommunityItemComponent,
    CreateCommunityComponent,
    CommunityComponent,
    CommunityDetailsComponent,
    PostDetailsComponent,
    PostComponent,
    CreatePostComponent,
    CommentsListComponent,
    CommentItemComponent,
    CreateCommentComponent,
    CreateCommentReplyComponent,
    MyProfileComponent,
    EditProfileComponent,
    EditPasswordComponent,
    SuspendCommunityComponent,
    EditCommunityComponent,
    EditPostComponent,
    SortPostsComponent,
    SortPostsInCommunityComponent,
    SortCommentComponent,
    ReportPostComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    PostService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    AuthenticationService,
    JwtUtilsService,
    CanActivateAuthGuard,
    CanActivateAuthAdminGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
