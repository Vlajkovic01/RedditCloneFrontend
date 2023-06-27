import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Flair} from "../../model/Flair.model";
import {Post} from "../../model/Post.model";
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {PostService} from "../../service/post/post.service";
import {ActivatedRoute} from "@angular/router";
import {environment} from "../../../environments/environment";
import {FlairCreateDTO} from "../../model/dto/flair/FlairCreateDTO";
import {PostEditDTO} from "../../model/dto/post/PostEditDTO";
import {PDFResponseDTO} from "../../model/dto/PDFResponseDTO";

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  @Input()
  post:Post = new Post();
  @Input()
  flairs:Flair[] = [];
  @Output()
  newPostEvent = new EventEmitter<Post>();

  file: File | undefined;

  selectedPdfFile!: File;
  pdfName = ''

  submitted = false;
  communityId: number = 0;

  editPostForm = this.fb.group({
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
      this.communityId = params['idCommunity'];
    })

    this.editPostForm.patchValue(
      {text: this.post.text, flair: this.post.flair.name}
    )

  }

  get f(): { [key: string]: AbstractControl } {
    return this.editPostForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.editPostForm.invalid) {
      return;
    }
    let newPost = this.editPost();
    if (this.file) {
      this.postService.saveImage(this.file).subscribe((image:string) => {
        newPost.imagePath = environment.imagePathForPost + image;
        if (this.selectedPdfFile !== undefined) {
          this.postService.savePDF(this.selectedPdfFile).subscribe((pdf:PDFResponseDTO) => {
            newPost.pdf = pdf
            this.postService.edit(newPost, this.communityId, this.post.id).subscribe((post:Post) => {
              this.newPostEvent.emit(post);
              this.onReset();
            });
          })
        } else {
          this.postService.edit(newPost, this.communityId, this.post.id).subscribe((post:Post) => {
            this.newPostEvent.emit(post);
            this.onReset();
          });
        }
      });
    } else {
      if (this.selectedPdfFile !== undefined) {
        this.postService.savePDF(this.selectedPdfFile).subscribe((pdf:PDFResponseDTO) => {
          newPost.pdf = pdf
          this.postService.edit(newPost, this.communityId, this.post.id).subscribe((post:Post) => {
            this.newPostEvent.emit(post);
            this.onReset();
          });
        })
      } else {
        this.postService.edit(newPost, this.communityId, this.post.id).subscribe((post:Post) => {
          this.newPostEvent.emit(post);
          this.onReset();
        });
      }
    }
  }

  onReset() {
    this.submitted = false;
    this.editPostForm.reset()
  }

  editPost() {
    let newPost = new PostEditDTO()

    newPost.text = this.editPostForm.value.text;

    if (this.editPostForm.value.flair != "") {
      let flair = new FlairCreateDTO();
      flair.name = this.editPostForm.value.flair;
      newPost.flair = flair;
    }

    return newPost;
  }

  uploadFile(event: any) {

    // @ts-ignore
    this.file = (event.target as HTMLInputElement).files[0];

    // @ts-ignore
    this.createPostForm.get('image').updateValueAndValidity()
  }

  onPDFChanged(event : any){
    this.selectedPdfFile = (event.target)?.files[0];
    this.pdfName = (event.target)?.files[0].name;
  }

}
