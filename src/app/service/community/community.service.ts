import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Community} from "../../model/Community.model";
import {environment} from "../../../environments/environment";
import {CommunityCreateDTO} from "../../model/dto/community/CommunityCreateDTO";
import {CommunitySuspendDTO} from "../../model/dto/community/CommunitySuspendDTO";
import {CommunityEditDTO} from "../../model/dto/community/CommunityEditDTO";
import {ModeratorDeleteFromCommunityDTO} from "../../model/dto/moderator/ModeratorDeleteFromCommunityDTO";
import {PDFResponseDTO} from "../../model/dto/PDFResponseDTO";

@Injectable({
  providedIn: 'root'
})
export class CommunityService {

  private readonly communitiesPath = environment.path + "communities"
  private readonly uploadPDFPath = environment.path + "upload/pdf"

  constructor(private http:HttpClient) { }

  getAll():Observable<Community[]> {
    return this.http.get<Community[]>(this.communitiesPath);
  }

  getSingleCommunity(id:number):Observable<Community> {
    return this.http.get<Community>(this.communitiesPath + `/${id}` )
  }

  create(community:CommunityCreateDTO) {
    return this.http.post(this.communitiesPath, community);
  }

  suspendCommunity(id: number, reason:CommunitySuspendDTO) {
    return this.http.post(this.communitiesPath + `/${id}/suspend`, reason)
  }

  edit(community: CommunityEditDTO, id: number) {
    return this.http.put<Community>(this.communitiesPath + `/${id}`, community)
  }

  removeModerator(moderatorDTO:ModeratorDeleteFromCommunityDTO):Observable<Community> {
    return this.http.post<Community>(this.communitiesPath + `/${moderatorDTO.communityId}/moderators`, moderatorDTO)
  }

  savePDF(file: any):Observable<PDFResponseDTO> {
    let formData = new FormData();
    formData.append("pdf", file);
    return this.http.post<PDFResponseDTO>(this.uploadPDFPath, formData);
  }
}
