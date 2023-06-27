import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder} from "@angular/forms";
import {CommunityService} from "../../../service/community/community.service";
import {Router} from "@angular/router";
import {PostService} from "../../../service/post/post.service";

@Component({
  selector: 'app-input-search-post',
  templateUrl: './input-search-post.component.html',
  styleUrls: ['./input-search-post.component.css']
})
export class InputSearchPostComponent implements OnInit {
  logic: string = 'AND';
  @Output() searchEvent = new EventEmitter<boolean>();

  searchCommunityForm = this.fb.group({
    title: [""],
    text: [""],
    pdfText: [""],
    comments: [""],
    flair: [""],
    karmaFrom: [""],
    karmaTo: [""],
    fuzzy: [false],
  });
  constructor(private fb: FormBuilder,
              private postService: PostService,
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
    this.postService.search(this.createSearchParams()).subscribe((posts)=>{
      console.log(JSON.stringify(posts))
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
