import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {NotFoundComponent} from "./pages/not-found/not-found.component";
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {CommunitiesComponent} from "./pages/communities/communities.component";
import {CanActivateAuthGuard} from "./security/authentication/can-activate-auth.guard";
import {CreateCommunityComponent} from "./components/create-community/create-community.component";
import {CommunityComponent} from "./pages/community/community.component";
import {PostComponent} from "./pages/post/post.component";
import {MyProfileComponent} from "./pages/my-profile/my-profile.component";

const routes: Routes = [
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'registration', component: RegisterComponent
  },
  {
    path: 'communities', component: CommunitiesComponent
  },
  {
    path: 'communities/add', component: CreateCommunityComponent, canActivate: [CanActivateAuthGuard]
  },
  {
    path: 'communities/:id', component:CommunityComponent
  },
  {
    path: 'users/:username', component:MyProfileComponent
  },
  {
    path: 'communities/:idCommunity/posts/:idPost', component:PostComponent
  },
  {
    path: '', redirectTo: 'home', pathMatch:'full'
  },
  {
    path:'**', component:NotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
