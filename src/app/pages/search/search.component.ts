import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  constructor() { }

  showSearchCommunity: boolean = false;
  showSearchPost: boolean = false;

  ngOnInit(): void {
  }

  onChangeShowSearchCommunity() {
    this.showSearchCommunity = !this.showSearchCommunity;
  }

  onChangeShowSearchPost() {
    this.showSearchPost = !this.showSearchPost;
  }

}
