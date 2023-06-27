import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder} from "@angular/forms";
import {CommunityService} from "../../../service/community/community.service";
import {Router} from "@angular/router";
import {CommunitySearchResponseDTO} from "../../../model/dto/community/CommunitySearchResponseDTO";
import {Post} from "../../../model/Post.model";

@Component({
  selector: 'app-input-search-community',
  templateUrl: './input-search-community.component.html',
  styleUrls: ['./input-search-community.component.css']
})
export class InputSearchCommunityComponent implements OnInit {
  logic: string = 'AND';
  @Output()
  getCommunitiesEvent = new EventEmitter<CommunitySearchResponseDTO[]>();

  searchCommunityForm = this.fb.group({
    name: [""],
    description: [""],
    pdfText: [""],
    rules: [""],
    numOfPostsFrom: [""],
    numOfPostsTo: [""],
    avgKarmaFrom: [""],
    avgKarmaTo: [""],
    fuzzy: [false],
  });
  constructor(private fb: FormBuilder,
              private communityService: CommunityService,
              private router: Router) { }

  ngOnInit(): void {
  }

  get f(): { [key: string]: AbstractControl } {
    return this.searchCommunityForm.controls;
  }
  setLogic(logic :string){
    this.logic = logic;
  }

  onSubmit() {
    if (this.searchCommunityForm.invalid) {
      return;
    }
    this.communityService.search(this.createSearchParams()).subscribe((communities:CommunitySearchResponseDTO[]) => {
      this.getCommunitiesEvent.emit(communities);
    });
  }

  createSearchParams() {
    const keys: string[] = Object.keys(this.searchCommunityForm.controls)
    let searchParams: Record<string, any> = {logic: this.logic}
    for (const key of keys) {
      const value = this.searchCommunityForm.controls[key].value
      if (value !== "") {
        searchParams[key] = value
      }
    }
    return searchParams;
  }

}
