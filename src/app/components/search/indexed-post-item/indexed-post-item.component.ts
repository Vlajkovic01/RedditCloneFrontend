import {Component, Input, OnInit} from '@angular/core';
import {PostSearchResponseDTO} from "../../../model/dto/post/PostSearchResponseDTO";

@Component({
  selector: 'app-indexed-post-item',
  templateUrl: './indexed-post-item.component.html',
  styleUrls: ['./indexed-post-item.component.css']
})
export class IndexedPostItemComponent implements OnInit {
  @Input()
  post: PostSearchResponseDTO = new PostSearchResponseDTO()
  constructor() { }

  ngOnInit(): void {
  }

}
