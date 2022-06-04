import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Flair} from "../../model/Flair.model";
import {FlairCreateDTO} from "../../model/dto/flair/FlairCreateDTO";
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {PostService} from "../../service/post/post.service";
import {PostCreateDTO} from "../../model/dto/post/PostCreateDTO";
import {Post} from "../../model/Post.model";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  @Input()
  flairs:Flair[] = [];
  @Output()
  newPostEvent = new EventEmitter<Post>();

  // preview: string | undefined;
  file: File | undefined;

  submitted = false;
  communityId: number = 0;

  createPostForm = this.fb.group({
    title: ["", [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20)
    ]],
    text: ["", [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100)
    ]],
    flair: [""],
    image: [""]
  });

  constructor(private fb: FormBuilder,
              private postService: PostService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.communityId = params['id'];
    })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.createPostForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.createPostForm.invalid) {
      return;
    }

    if (this.file) {
      this.postService.saveImage(this.file).subscribe((image:string) => {
        let newPost = this.createPost();
        newPost.imagePath = environment.imagePathForPost + image;
        this.postService.create(newPost, this.communityId).subscribe((post:Post) => {
          this.newPostEvent.emit(post);
          // this.preview = undefined;
          this.onReset();
        });
      });
    } else {
      this.postService.create(this.createPost(), this.communityId).subscribe((post:Post)=>{
        this.newPostEvent.emit(post);
        // this.preview = undefined;
        this.onReset();
      })
    }
  }

  onReset() {
    this.submitted = false;
    this.createPostForm.reset()
  }

  createPost() {
    let newPost = new PostCreateDTO();

    newPost.title = this.createPostForm.value.title;
    newPost.text = this.createPostForm.value.text;

    if (this.createPostForm.value.flair != "") {
      let flair = new FlairCreateDTO();
      flair.name = this.createPostForm.value.flair;
      newPost.flair = flair;
    }
    return newPost;
  }

  uploadFile(event: any) {

    // @ts-ignore
    this.file = (event.target as HTMLInputElement).files[0];
    // this.createPostForm.patchValue({
    //   image: this.file.name
    // })

   // @ts-ignore
    this.createPostForm.get('image').updateValueAndValidity()

    // const reader = new FileReader();
    // reader.onload = () => {
    //   this.preview = reader.result as string;
    // }
    // reader.readAsDataURL(this.file);
    //TODO delete all comment and check formControlName="image"
  }
}
