import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder} from "@angular/forms";
import {CommunityService} from "../../../service/community/community.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-input-search-community',
  templateUrl: './input-search-community.component.html',
  styleUrls: ['./input-search-community.component.css']
})
export class InputSearchCommunityComponent implements OnInit {
  logic: string = 'AND';
  @Output() searchEvent = new EventEmitter<boolean>();

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
    this.searchEvent.emit(true)

    if (this.searchCommunityForm.invalid) {
      return;
    }
    this.communityService.search(this.createSearchParams()).subscribe((communities)=>{
      console.log(JSON.stringify(communities))
    }, (error) => {

    })
    console.log(JSON.stringify(this.createSearchParams()))
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
