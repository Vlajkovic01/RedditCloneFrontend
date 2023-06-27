import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {CommunityService} from "../../service/community/community.service";
import {CommunityCreateDTO} from "../../model/dto/community/CommunityCreateDTO";
import {FlairCreateDTO} from "../../model/dto/flair/FlairCreateDTO";
import {RuleCreateDTO} from "../../model/dto/rule/RuleCreateDTO";
import {PDFResponseDTO} from "../../model/dto/PDFResponseDTO";

@Component({
  selector: 'app-create-community',
  templateUrl: './create-community.component.html',
  styleUrls: ['./create-community.component.css']
})
export class CreateCommunityComponent implements OnInit {

  submitted = false;
  forbidden = false;
  flairsDTO: FlairCreateDTO[] = [];
  rulesDTO: RuleCreateDTO[] = [];
  selectedPdfFile!: File;
  pdfName = ''

  createCommunityForm = this.fb.group({
    name: ["", [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20)
    ]],
    description: ["", [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100)
    ]],
    flairs: [""],
    rules: [""]
  });

  constructor(private fb: FormBuilder,
              private communityService: CommunityService,
              private router: Router) { }

  ngOnInit(): void {
  }

  get f(): { [key: string]: AbstractControl } {
    return this.createCommunityForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.createCommunityForm.invalid) {
      return;
    }

    let newCommunity = this.createCommunity();

    if (this.selectedPdfFile !== undefined) {
      this.communityService.savePDF(this.selectedPdfFile).subscribe((pdf:PDFResponseDTO)=>{
        newCommunity.pdf = pdf
        this.communityService.create(newCommunity).subscribe(()=>{
          this.router.navigate(["/communities"])
        }, (error) => {
          this.forbidden = true;
        })
      }, (error) => {
        this.forbidden = true;
      })
    } else {
      this.communityService.create(newCommunity).subscribe(()=>{
        this.router.navigate(["/communities"])
      }, (error) => {
        this.forbidden = true;
      })
    }
  }

  onReset() {
    this.submitted = false;
    this.forbidden = false;
    this.createCommunityForm.reset()
    this.flairsDTO.length = 0;
    this.rulesDTO.length = 0;
  }

  createFlair() {
    if (this.createCommunityForm.value.flairs == null) {
      return;
    }
    if (this.createCommunityForm.value.flairs.length != 0) {
      let flair = new FlairCreateDTO();
      flair.name = this.createCommunityForm.value.flairs
      this.flairsDTO.push(flair)
      this.createCommunityForm.controls['flairs'].reset();
    }
  }

  createRule() {
    if (this.createCommunityForm.value.rules == null) {
      return;
    }
    if (this.createCommunityForm.value.rules.length != 0) {
      let rule = new RuleCreateDTO();
      rule.description = this.createCommunityForm.value.rules
      this.rulesDTO.push(rule)
      this.createCommunityForm.controls['rules'].reset()
    }
  }

  createCommunity() {
    let newCommunity = new CommunityCreateDTO();
    newCommunity.name = this.createCommunityForm.value.name;
    newCommunity.description = this.createCommunityForm.value.description;
    newCommunity.flairs = this.flairsDTO;
    newCommunity.rules = this.rulesDTO;

    return newCommunity;
  }

  onPDFChanged(event : any){
    this.selectedPdfFile = (event.target)?.files[0];
    this.pdfName = (event.target)?.files[0].name;
  }
}
