import {Component, Input, OnInit} from '@angular/core';
import {Comment} from "../../model/Comment.model";
import {Community} from "../../model/Community.model";

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.css']
})
export class CommentsListComponent implements OnInit {
  @Input() comments:Comment[] = [];
  @Input() community:Community = new Community();
  constructor() { }

  ngOnInit(): void {
  }

}
