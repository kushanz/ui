import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { InboxItem } from '../models/inbox-item.model';
import { RenderingTokenRequest } from '../models/rendering-request.model';
import { FormPermission } from '../models/workflow.model';
import { ApplicationUserSettings } from '../models/application-user-settings.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  // for login
  getLoginUrl() {
    return this.http.get(environment.basePath +'/api/Authentications/GetLoginPath');
  }

  getEnadocJwt(code : string) {
    return this.http.get(environment.basePath + '/api/Authentications/GetJwtJson/'+ code);
  }

  getSignoutUrl() {
    return this.http.get(environment.basePath + '/api/Authentications/GetSignoutPath');
  }

  getCurrentUser(userRefereneceId: string) {
    return this.http.get(environment.basePath + '/api/Authentications/GetCurrentUser/'+ userRefereneceId);
  }

  // for inbox items

  public getInboxList(type: string) {
    return this.http.get(environment.basePath + '/api/inboxitems/type/'+ type);
  }

  public getInboxListByKeyword(type:string,phrase:string){
    return this.http.get(environment.basePath + '/api/InboxItems/Search/'+type+'/Keyword/'+phrase);
  }

  public getInboxListByReference(type:string,reference:number){
    return this.http.get(environment.basePath + '/api/InboxItems/Search/'+type+'/Reference/'+reference);
  }

  public deleteAllInboxes() {    
    return this.http.delete(environment.basePath + '/api/inboxitems/');
  }

  public getInboxes(id: number) {
    return this.http.get(environment.basePath + '/api/inboxitems/'+ id);
  }

  public changeStatus(inboxItem: InboxItem) {
    return this.http.put(environment.basePath + '/api/inboxitems/ChangeStatus', inboxItem);
  }

  public getFormAssignments(){
    return this.http.get(environment.basePath+'/api/FormAssignments/User');
  }

  public getRenderingUrl(formPermission:FormPermission){
    return this.http.post(environment.basePath+'/api/FormAssignments/Render/',formPermission)
  }
  public getWorkflowCards(type: string) {
    return this.http.get(environment.basePath + '/api/inboxitems/GetCountByTpe/'+ type);
  }
  public getWorkflowCardsByKeyword(type:string,phrase:string){
    return this.http.get(environment.basePath + '/api/InboxItems/NewSearch/'+type+'/Keyword/'+phrase);
  }
  public getWorkflowCardsByReference(type:string,reference:number){
    return this.http.get(environment.basePath + '/api/InboxItems/NewSearch/'+type+'/Reference/'+reference);
  }
  public getInboxListNew(type:string,startRowIndex:number,perpage:number,workflowId:number) {
    return this.http.get(environment.basePath + '/api/InboxItems/'+startRowIndex+'/'+type+'/'+workflowId+'/'+perpage);
  }

  // for search
  public getAllProteusWorkflows(){
    return this.http.get(environment.basePath+"/api/Workflows/all");
  }

  public KeywordSearch(workflow:number,phrase:string){
    return this.http.get(environment.basePath+"/api/Search/"+workflow+"/Keyword/"+window.btoa(phrase));
  }

  public SearchByReferenceNumber(workflow:number,referecneNumber:number){
    return this.http.get(environment.basePath+"/api/Search/"+workflow+"/Reference/"+referecneNumber);
  }

  public SearchByInitiateDate(workflow:number,initiateDate:Date){
    return this.http.get(environment.basePath+"/api/Search/"+workflow+"/InitiateDate/"+initiateDate);
  }

  public getRenderingToken(renderingRequest:RenderingTokenRequest){
    return this.http.post(environment.basePath+"/api/Search/RenderingRequest",renderingRequest);
  }
  public changeLanguage(setting: ApplicationUserSettings){
    return this.http.post(environment.basePath+"/api/settings/changelanguage",setting);
  }

  public getInitializationData(){
    return this.http.get(environment.basePath+"/api/settings/initializationData");
  }

  public getLanguage() {
    return this.http.get(environment.basePath + "/api/settings/language");
  }
  public getWorkflowInstances(){

    return this.http.get(environment.basePath + "/api/dashboarddata/workflows/instances/statistics");
  }

  public getAppLinks(){
    return this.http.get(environment.basePath + "/api/settings/applinks")
  }

  public getWorkflowsByTenant(){
    return this.http.get(environment.basePath + "/api/dashboarddata/workflows")
  }

  public getWorkflowInstancesByWorkflowId(workflowId : number){
    return this.http.get(environment.basePath + "/api/dashboarddata/workflows/instances/"+workflowId)
  }

  public getWorkflowInstancesByStatusAsync(status : string ){
    return this.http.get(environment.basePath + "/api/dashboarddata/workflows/instances?status="+status)
  }

  public getSubWorkflowDetailsByWorkflowId(workflowId : number){
    return this.http.get(environment.basePath + "/api/dashboarddata/workflows/subworkflows/"+workflowId)
  }
  //  api list for new ui
  public getWorkFlowList(type: string) {
    return this.http.get(environment.basePath + '/api/inboxitems/GetCountByTpe/'+ type);
  }
  public getInboxListByWorkFlow(type:string,start:number,perpage:number,workflowId:number) {
    return this.http.get(environment.basePath + '/api/InboxItems/'+start+'/'+type+'/'+workflowId+'/'+perpage);
  }
}

