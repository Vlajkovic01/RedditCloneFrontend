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
