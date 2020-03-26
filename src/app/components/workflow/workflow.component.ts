import { Component,Inject, OnInit, Pipe, PipeTransform,Input } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { DomSanitizer } from "@angular/platform-browser";
import { ApiService } from "../../services/api.service";
import { AuthGuardService } from "src/app/auth-guards/auth-guard";
import { GlobalVars } from "./../../services/globalvars.service";
import { UserWithCredentials } from "src/app/models/user-with-credentials";
import { User } from "./../../models/user.model";
import { ApplicationUserSettings } from '../../models/application-user-settings.model';
import { TranslateService } from '@ngx-translate/core';
import { NotificationsService } from 'angular2-notifications';
import { NotificationHub } from "../../services/notification-hub.service";
import { AppLink } from '../../models/sub-app';



// models
import { InboxItem, workflowModal, workflowCountModal } from "../../models/inbox-item.model";
import { FormPermission, FormAssignment } from '../../models/workflow.model';
@Pipe({ name: 'inboxformsafepipe' })
export class InboxFormSafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
@Component({
  selector: 'Workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.css']
})


export class WorkflowComponent implements OnInit {
  public userWithCredentials: UserWithCredentials = new UserWithCredentials()
  user:User = new User();
  selectLanguage: string;
  language: ApplicationUserSettings = new ApplicationUserSettings();
  public subApps: Array<AppLink>
  public currentApp: AppLink

  public isAppMenu:boolean = false;
  public isUserMenu:boolean = false;
  public inboxItemTypes: string[] = ['All','Pending', 'Completed', 'TimeEscalated'];
  public selectedType: string;
  public openNewRequestModal:boolean = false;
  public doItemModal:boolean = false;
  public isExpandSearch:boolean = false;
  public isOpenAdvanceSearch:boolean = false;
  public isOpenSearchPanel:boolean = false;
  public openWorkspaceList:string;
  public received:boolean = false;
  public sent:boolean = false;
  public completed:boolean = false;
  public timeescalated:boolean = false;
  public isLoadingwf: boolean = false;
  public isErrorLoading:boolean = false;
  public isOpenPanel:boolean = false;
  public isInboxLoader:boolean;

  public workflowCards:workflowModal[] = [];
  public activeWorkFlowCard:workflowModal;
  public inboxItems: InboxItem[] = [];
  public activeInboxItem: InboxItem;

  public searchPhrase:string = ""
  public referanceNo: any;

  public formPermission: Array<FormPermission> = new Array<FormPermission>();
  public formPermissionIsLoading:boolean;
  public masonryDivLeft:string;
  public masonryOptions = {
          transitionDuration: '0.8s',
          fitWidth: true,
          originLeft:true,
          originTop: false,
          horizontalOrder:true,
          resize:true,
          gutter: 45,
          percentPosition: true,
          initLayout: true,
        }
  
  constructor(private apiService: ApiService,private authGuard : AuthGuardService, 
    private globalVars: GlobalVars,@Inject(DOCUMENT) private document: any,private translate: TranslateService,
    private _sanitizer: DomSanitizer,private _notifications: NotificationsService,private notificationHub: NotificationHub) { 
      
      this.notificationHub.GetInboxItemsObservable().subscribe(newItem  => {
        console.log(newItem)
        
        if(newItem.filterType =="Pending" && this.selectedType == "Pending") { //pending-pending
          this._notifications.success('Pending Item recieved!', newItem.workflowName);
          this.workflowCards.forEach(card => {
            if(card.workflowId === newItem.workflowId){
              card.itemCount++  //increment pending card notification
            }
          });
          if(newItem.workflowId === this.activeWorkFlowCard.workflowId) {
            this.inboxItems.unshift(newItem)
          }
        }
        else if(newItem.filterType =="Completed" && this.selectedType == "Pending") { // pending completed
          this._notifications.success('Item Completed!', newItem.workflowName);
          this.workflowCards.forEach(card => {
            if(card.workflowId === newItem.workflowId){
              card.itemCount--  //decrement pending card notification
            }
          });
          if(newItem.workflowId === this.activeWorkFlowCard.workflowId) { // remove item when it completed task
            let index:number = this.inboxItems.indexOf(newItem)
            if(index !== -1) {
              this.inboxItems.splice(index,1)
            }
          }
        }
        // ---------------------------------------------
        else if(newItem.filterType =="Pending" && this.selectedType == "Completed") {
          this._notifications.success('Pending Item recieved!', newItem.workflowName);
        }
        else if(newItem.filterType =="Completed" && this.selectedType == "Completed") {
          this.workflowCards.forEach(card => {
            if(card.workflowId === newItem.workflowId){
              card.itemCount++  //increment pending card notification
            }
          });
          if(newItem.workflowId === this.activeWorkFlowCard.workflowId) {
            this.inboxItems.unshift(newItem)
          }
        }
      })
    }

  ngOnInit() {
    let token = AuthGuardService.token;
        this.globalVars.getUser().subscribe((result:User) =>{
            this.user = result;
            console.log('user',this.user)
          });
          this.selectedType = 'Pending';
          this.loadWorkFlows();
  }


  appmenu(state:boolean) {
    if(state) {
      this.isAppMenu = !this.isAppMenu;
    } else {
      this.isAppMenu = false;
    }
  }
  usermenu(state:boolean) {
    if(state) {
      this.isUserMenu = !this.isUserMenu
    } else {
      this.isUserMenu = false;
    }
  }
  expandSeach(state) {
    this.isExpandSearch = state;
    if(!this.isExpandSearch) {
      this.isOpenAdvanceSearch = false;
      // this.isOpenSearchPanel = false;
    }
  }
  expandSearchToggle() {
    this.isExpandSearch = !this.isExpandSearch;
    if(!this.isExpandSearch) {
      this.isOpenAdvanceSearch = false;
      // this.isOpenSearchPanel = false;
    }
  }
  // do open close new Requeat Modal
  doNewReqModal(e:boolean) {
    this.openNewRequestModal = e;
    this.getFormAssignments();
  }
  // do open item wise modal
  openItemModal() {
    this.doItemModal = true;
  }
  closeItemModal() {
    this.doItemModal = false
  }
  setActiveInboxItem(item:InboxItem) {
    this.activeInboxItem = item;
  }
  openAdvanceSeach() {
    this.isOpenAdvanceSearch = true;
  }
  closeAdvaneSearch() {
    this.isOpenAdvanceSearch = false;
  }
  toggleWorkspaceList(item:string) {
    if(this.openWorkspaceList == item) {
      this.openWorkspaceList ="";
    } else {
      this.openWorkspaceList = item;
    }
  }
  doSearch () {
    // search Action Goes Here
    this.isErrorLoading = false
    if(this.searchPhrase != "") {
      this.isLoadingwf = true
      this.apiService.getWorkflowCardsByKeyword(this.selectedType,this.searchPhrase).subscribe((data: Array<workflowModal>) => {
        this.workflowCards = data
        this.isLoadingwf = false
        this.expandSeach(false)
      })
    } else {
      this.isLoadingwf = true
      this.apiService.getWorkflowCards(this.selectedType).subscribe((data: Array<workflowModal>) => {
        this.workflowCards = data
        this.isLoadingwf = false
        this.expandSeach(false)
      })
    }
  }
  doAdvanceSearch () {
    this.isErrorLoading = false
    if(this.referanceNo != "") {
      this.isLoadingwf = true
      this.apiService.getWorkflowCardsByReference(this.selectedType,this.referanceNo).subscribe((data:workflowCountModal) => {
        this.workflowCards = [{itemCount:data.itemCount,workflowId:data.workflowId,workflowName:data.workflowName} as workflowModal]
        this.isLoadingwf = false
      },error => {
        this.isErrorLoading = true
        this.expandSeach(false)
      })
    }
  }
  doClearSearchPhrase () {
    this.searchPhrase = ""
  }
  doClearSearch () {
    // do clear all search values
    this.isOpenSearchPanel = false;
  }
  // select tab item
  tabitemClick(type:string) {
    this.selectedType = type;
    this.loadWorkFlows();
  }

  // ------------load inbox items with filter----------------------
  // loadInboxItemsByType(type:any) {
  //   this.apiService.getInboxList(type).subscribe((data:any) => {
  //     this.inboxItems = data;
  //     this.inboxItems.map((item:  InboxItem) => {
  //       if( item.identityValues !== null){
  //         item.identityValues = JSON.parse( item.identityValues.toString());
  //       }
  //     })
  //   })
  // }
  // load workflows
  loadWorkFlows() {
    this.isLoadingwf = true
    this.apiService.getWorkFlowList(this.selectedType).subscribe((data: any) => {
      this.workflowCards = data
      this.isLoadingwf = false
    })
  }

  // get form assignments -- new workflow list items load
  getFormAssignments() {
    this.formPermissionIsLoading = true;
    this.apiService.getFormAssignments().subscribe((result: Array<FormAssignment>) => {
      if (result != null) {
        this.formPermission = [];
        result.forEach(form => {
          if (form.formPermissions.length > 0 && form.formPermissions[0].id > 0) {
            form.formPermissions.forEach(permission => {
              this.formPermission.push(permission)
            })
          }
        })
      }
      this.formPermissionIsLoading = false
    })
  }
 
  loadInboxItems(card:workflowModal,event) {
    let offsetLeft = 0;
    let offsetTop = 0;
    let el = event.srcElement;
    while(el){
        offsetLeft += el.offsetLeft;
        offsetTop += el.offsetTop;
        el = el.parentElement;
    }
    // console.log({ offsetTop:offsetTop , offsetLeft:offsetLeft })
    this.masonryDivLeft = (offsetLeft*-1)+30+"px"
    // console.log(this.masonryDivLeft)

    this.inboxItems = []
    this.activeWorkFlowCard = card
    this.isOpenPanel = true
    this.isInboxLoader = true
    if(card.workflowId) {
      this.apiService.getInboxListNew(this.selectedType,0,100,card.workflowId).subscribe((data:any) => {
        this.inboxItems = data
        this.isInboxLoader = false
      })
    }
  }
  // loadInboxItems(card:workflowModal) {
  //   this.activeWorkFlowCard = card
  //   this.isOpenPanel = true
  //   this.isInboxLoader = true
  //   if(card.workflowId) {
  //     this.apiService.getInboxListNew(this.selectedType,0,100,card.workflowId).subscribe((data:any) => {
  //       this.inboxItems = data
  //       this.isInboxLoader = false
  //     })
  //   }
  // }
  closePanel() {
    this.isOpenPanel = false;
  }
  approve(item:InboxItem) {
    // let index:number = this.inboxItems.indexOf(item)
    // if(index !== -1) {
    //   this.inboxItems.splice(index,1)
    // }
  }
  // username string to RGB value
  public strToRgb(str= "username"){
    var hash = 0;
   if (str.length === 0) return hash;
   for (var i = 0; i < str.length; i++) {
       hash = str.charCodeAt(i) + ((hash << 5) - hash);
       hash = hash & hash;
   }
   var rgb = [0, 0, 0];
   for (var i = 0; i < 3; i++) {
       var value = (hash >> (i * 8)) & 255;
       rgb[i] = value;
   }
   return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]},0.5)`;
 }
//  user logout init
async onClickSignOut()  {
  window.localStorage.clear();
  await this.authGuard.clearToken();
  await this.getSignOutUrl();
}
private getSignOutUrl() : Promise<any>{
  var promise = new Promise((resolve, reject) => {
      this.apiService.getSignoutUrl().subscribe((response) => {
          this.document.location.href = response;
      }, (error) => {
          console.log(error);
      });
      resolve();
  });
  return promise;
}
}
