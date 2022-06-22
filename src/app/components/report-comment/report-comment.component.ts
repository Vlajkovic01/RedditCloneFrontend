import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../model/Post.model";
import {Comment} from "../../model/Comment.model";
import {ReportReason} from "../../model/enum/ReportReason.enum";
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {ReportService} from "../../service/report/report.service";
import {ReportCreateDTO} from "../../model/dto/report/ReportCreateDTO";
import {ActivatedRoute} from "@angular/router";
import {Community} from "../../model/Community.model";

@Component({
  selector: 'app-report-comment',
  templateUrl: './report-comment.component.html',
  styleUrls: ['./report-comment.component.css']
})
export class ReportCommentComponent implements OnInit {

  @Input()
  comment:Comment = new Comment();

  submitted = false;
  blankReasonField = false;
  communityId = 0;

  reportEnum: Array<string> = Object.keys(ReportReason).filter(key => isNaN(+key));

  reportCommentForm = this.fb.group({
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
  }

  get f(): { [key: string]: AbstractControl } {
    return this.reportCommentForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.reportCommentForm.value.reason === "" || this.reportCommentForm.value.reason === null) {
      this.blankReasonField = true;
      return;
    }

    this.reportService.create(this.createReport()).subscribe(()=>{
      alert("Successfully reported");
      this.onReset();
    }, () => {
      alert("You already reported this comment.")
      this.onReset();
    })
  }

  onReset() {
    this.submitted = false;
    this.blankReasonField = false;
    this.reportCommentForm.reset()
  }

  createReport() {
    let newReport = new ReportCreateDTO();
    newReport.reason = this.reportCommentForm.value.reason;
    newReport.commentId = this.comment.id;
    newReport.communityId = this.communityId;
    return newReport;
  }

}
