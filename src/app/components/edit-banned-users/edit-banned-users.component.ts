import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BannedService} from "../../service/banned/banned.service";
import {Report} from "../../model/Report.model";
import {Banned} from "../../model/Banned.model";

@Component({
  selector: 'app-edit-banned-users',
  templateUrl: './edit-banned-users.component.html',
  styleUrls: ['./edit-banned-users.component.css']
})
export class EditBannedUsersComponent implements OnInit {

  bans:Banned[] = []

  constructor(private route:ActivatedRoute,
              private bannedService:BannedService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const communityId = params['id'];
      this.bannedService.getAllByCommunity(communityId).subscribe((bans:Banned[]) => {
        this.bans = bans;
      })
    })
  }

  unblockUser(id:number, username:string) {
    this.bannedService.delete(id, username).subscribe((bans:Banned[]) => {
      this.bans = bans;
    })
  }

}
