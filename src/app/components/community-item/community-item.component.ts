import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Community} from "../../model/Community.model";

@Component({
  selector: 'app-community-item',
  templateUrl: './community-item.component.html',
  styleUrls: ['./community-item.component.css']
})
export class CommunityItemComponent implements OnInit {

  @Input()
  community: Community = new Community()

  constructor(private router:Router) {

  }

  ngOnInit(): void {
  }

}
