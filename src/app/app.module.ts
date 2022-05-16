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
import {HttpClientModule} from "@angular/common/http";
import { PostItemComponent } from './components/post-item/post-item.component';
import { CommunitiesComponent } from './pages/communities/communities.component';
import { CommunitiesListComponent } from './components/communities-list/communities-list.component';
import { CommunityItemComponent } from './components/community-item/community-item.component';

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
    CommunityItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
