import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../../security/authentication/authentication.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  hasLoggedIn() {
    return this.authService.hasLoggedIn();
  }

  logout() {
    return this.authService.logout();
  }

  getUsernameFromLoggedUser() {
    return this.authService.getUsernameFromLoggedUser();
  }

}
