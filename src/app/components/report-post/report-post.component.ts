import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../model/Post.model";
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {ReportReason} from "../../model/enum/ReportReason.enum";
import {ReportService} from "../../service/report/report.service";
import {ReportCreateDTO} from "../../model/dto/report/ReportCreateDTO";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-report-post',
  templateUrl: './report-post.component.html',
  styleUrls: ['./report-post.component.css']
})
export class ReportPostComponent implements OnInit {

  @Input()
  post:Post = new Post();

  submitted = false;
  blankReasonField = false;
  communityId:number = 0;

  reportEnum: Array<string> = Object.keys(ReportReason).filter(key => isNaN(+key));

  reportPostForm = this.fb.group({
    reason: ["",[
      Validators.required
    ]]
  });

  constructor(private fb: FormBuilder,
              private reportService:ReportService,
              private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.communityId = params['idCommunity'];
    })
    console.log(this.communityId)
  }

  get f(): { [key: string]: AbstractControl } {
    return this.reportPostForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.reportPostForm.value.reason === "" || this.reportPostForm.value.reason === null) {
      this.blankReasonField = true;
      return;
    }

    this.reportService.create(this.createReport()).subscribe(()=>{
      alert("Successfully reported");
      this.onReset();
    }, () => {
      alert("You already reported this post.")
      this.onReset();
    })
  }

  onReset() {
    this.submitted = false;
    this.blankReasonField = false;
    this.reportPostForm.reset()
  }

  createReport() {
    let newReport = new ReportCreateDTO();
    newReport.reason = this.reportPostForm.value.reason;
    newReport.postId = this.post.id;
    newReport.communityId = this.communityId;
    return newReport;
  }

}
