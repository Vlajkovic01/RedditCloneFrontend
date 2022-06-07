import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Comment} from "../../model/Comment.model";
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {CommentService} from "../../service/comment/comment.service";
import {ActivatedRoute} from "@angular/router";
import {CommentCreateDTO} from "../../model/dto/comment/CommentCreateDTO";

@Component({
  selector: 'app-create-comment-reply',
  templateUrl: './create-comment-reply.component.html',
  styleUrls: ['./create-comment-reply.component.css']
})
export class CreateCommentReplyComponent implements OnInit {

  @Input()
  parent:Comment = new Comment();

  @Output()
  newCommentEvent = new EventEmitter<Comment>();

  submitted = false;

  createCommentReplyForm = this.fb.group({
    text: ["", [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100)
    ]]
  });

  constructor(private fb: FormBuilder,
              private commentService: CommentService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  get f(): { [key: string]: AbstractControl } {
    return this.createCommentReplyForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.createCommentReplyForm.invalid) {
      return;
    }

    this.commentService.create(this.createComment()).subscribe((comment:Comment)=>{
      this.newCommentEvent.emit(comment)
      this.onReset();
    }, (error) => {
      console.log("error")
    })
  }

  onReset() {
    this.submitted = false;
    this.createCommentReplyForm.reset()
  }

  createComment() {
    let newComment = new CommentCreateDTO();
    newComment.text = this.createCommentReplyForm.value.text;
    newComment.parentCommentId = this.parent.id;

    return newComment;
  }

}
