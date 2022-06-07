import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Flair} from "../../model/Flair.model";
import {Post} from "../../model/Post.model";
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {PostService} from "../../service/post/post.service";
import {ActivatedRoute} from "@angular/router";
import {environment} from "../../../environments/environment";
import {PostCreateDTO} from "../../model/dto/post/PostCreateDTO";
import {FlairCreateDTO} from "../../model/dto/flair/FlairCreateDTO";
import {Comment} from "../../model/Comment.model";
import {CommentCreateDTO} from "../../model/dto/comment/CommentCreateDTO";
import {CommentService} from "../../service/comment/comment.service";

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.css']
})
export class CreateCommentComponent implements OnInit {

  @Output()
  newCommentEvent = new EventEmitter<Comment>();

  submitted = false;
  postId: number = 0

  createCommentForm = this.fb.group({
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
    this.route.params.subscribe(params => {
      this.postId = params['idPost'];
    })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.createCommentForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.createCommentForm.invalid) {
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
    this.createCommentForm.reset()
  }

  createComment() {
    let newComment = new CommentCreateDTO();
    newComment.text = this.createCommentForm.value.text;
    newComment.postId = this.postId;

    return newComment;
  }
}
