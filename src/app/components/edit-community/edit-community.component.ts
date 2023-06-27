import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FlairCreateDTO} from "../../model/dto/flair/FlairCreateDTO";
import {RuleCreateDTO} from "../../model/dto/rule/RuleCreateDTO";
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {CommunityService} from "../../service/community/community.service";
import {Router} from "@angular/router";
import {CommunityCreateDTO} from "../../model/dto/community/CommunityCreateDTO";
import {CommunityEditDTO} from "../../model/dto/community/CommunityEditDTO";
import {Community} from "../../model/Community.model";
import {UserForMyProfileDTO} from "../../model/dto/user/UserForMyProfileDTO";
import {PDFResponseDTO} from "../../model/dto/PDFResponseDTO";

@Component({
  selector: 'app-edit-community',
  templateUrl: './edit-community.component.html',
  styleUrls: ['./edit-community.component.css']
})
export class EditCommunityComponent implements OnInit {

  @Input() community:Community = new Community();
  @Output()
  newCommunityEvent = new EventEmitter<Community>();

  submitted = false;
  flairsDTO: FlairCreateDTO[] = [];
  rulesDTO: RuleCreateDTO[] = [];
  selectedPdfFile!: File;
  pdfName = ''

  editCommunityForm = this.fb.group({
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
    this.fillFields();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.editCommunityForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.editCommunityForm.invalid) {
      return;
    }

    let newCommunity = this.editCommunity();

    if (this.selectedPdfFile !== undefined) {
      this.communityService.savePDF(this.selectedPdfFile).subscribe((pdf:PDFResponseDTO)=>{
        newCommunity.pdf = pdf
        this.communityService.edit(newCommunity, this.community.id).subscribe((community)=>{
          this.newCommunityEvent.emit(community)
        }, (error) => {
          alert("Try again later")
        })
      }, (error) => {
        alert("Try again later")
      })
    } else {
      this.communityService.edit(newCommunity, this.community.id).subscribe((community)=>{
        this.newCommunityEvent.emit(community)
      }, (error) => {
        alert("Try again later")
      })
    }
  }

  onReset() {
    this.submitted = false;
    this.editCommunityForm.reset()
  }

  createFlair() {
    if (this.editCommunityForm.value.flairs == null) {
      return;
    }
    if (this.editCommunityForm.value.flairs.length != 0) {
      let flair = new FlairCreateDTO();
      flair.name = this.editCommunityForm.value.flairs
      this.flairsDTO.push(flair)
      this.editCommunityForm.controls['flairs'].reset();
    }
  }

  removeFlair(flair:FlairCreateDTO) {
    const index = this.flairsDTO.indexOf(flair,0);
    this.flairsDTO.splice(index,1);
  }

  createRule() {
    if (this.editCommunityForm.value.rules == null) {
      return;
    }
    if (this.editCommunityForm.value.rules.length != 0) {
      let rule = new RuleCreateDTO();
      rule.description = this.editCommunityForm.value.rules
      this.rulesDTO.push(rule)
      this.editCommunityForm.controls['rules'].reset()
    }
  }

  removeRule(rule:RuleCreateDTO) {
    const index = this.rulesDTO.indexOf(rule,0);
    this.rulesDTO.splice(index,1);
  }

  editCommunity() {
    let editedCommunity = new CommunityEditDTO();
    editedCommunity.description = this.editCommunityForm.value.description;
    editedCommunity.flairs = this.flairsDTO;
    editedCommunity.rules = this.rulesDTO;

    return editedCommunity;
  }

  fillFields() {
    this.editCommunityForm.patchValue(
      {description: this.community.description}
    )
    this.flairsDTO = this.community.flairs;
    this.rulesDTO = this.community.rules;
  }

  onPDFChanged(event : any){
    this.selectedPdfFile = (event.target)?.files[0];
    this.pdfName = (event.target)?.files[0].name;
  }
}
