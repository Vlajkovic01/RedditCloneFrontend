import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Community} from "../../model/Community.model";
import {FlairCreateDTO} from "../../model/dto/flair/FlairCreateDTO";
import {RuleCreateDTO} from "../../model/dto/rule/RuleCreateDTO";
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {CommunityService} from "../../service/community/community.service";
import {Router} from "@angular/router";
import {CommunityEditDTO} from "../../model/dto/community/CommunityEditDTO";
import {Moderator} from "../../model/Moderator.model";
import {ModeratorDeleteFromCommunityDTO} from "../../model/dto/moderator/ModeratorDeleteFromCommunityDTO";

@Component({
  selector: 'app-edit-moderators',
  templateUrl: './edit-moderators.component.html',
  styleUrls: ['./edit-moderators.component.css']
})
export class EditModeratorsComponent implements OnInit {

  @Input() community:Community = new Community();
  @Output()
  newCommunityEvent = new EventEmitter<Community>();

  constructor(private fb: FormBuilder,
              private communityService: CommunityService,
              private router: Router) { }

  ngOnInit(): void {
  }


  // onSubmit() {
  //   this.communityService.edit(this.editCommunity(), this.community.id).subscribe((community:Community)=>{
  //     this.newCommunityEvent.emit(community)
  //   }, (error) => {
  //     alert("Try again later")
  //   })
  // }

  removeModerator(moderator:Moderator) {
    let moderatorDTO = new ModeratorDeleteFromCommunityDTO();
    moderatorDTO.communityId = this.community.id;
    moderatorDTO.moderatorId = moderator.id;
    if (confirm("Are you sure you want to delete -" + moderator.user?.displayName || moderator.user.username)) {
        this.communityService.removeModerator(moderatorDTO).subscribe((community:Community)=>{
          this.newCommunityEvent.emit(community)
        }, (error) => {
          alert("Try again later")
        })
    }
  }
}
