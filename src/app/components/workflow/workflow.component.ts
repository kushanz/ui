import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../services/api.service";

// models
import { InboxItem, workflowModal, workflowCountModal } from "../../models/inbox-item.model";
import { FormPermission, FormAssignment } from '../../models/workflow.model';

@Component({
  selector: 'Workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.css']
})


export class WorkflowComponent implements OnInit {
  public isAppMenu:boolean = false;
  public isUserMenu:boolean = false;
  public inboxItemTypes: string[] = ['All','Pending', 'Completed', 'TimeEscalated'];
  public selectedType: string;
  public openNewRequestModal:boolean = false;
  public openItemModal:boolean = false;
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

  public searchPhrase:string = ""
  public referanceNo: any;

  public formPermission: Array<FormPermission> = new Array<FormPermission>();
  public formPermissionIsLoading:boolean;
  public masonryDivLeft:string;
  public masonryOptions = {
          transitionDuration: '0.8s',
          fitWidth: false,
          originLeft:true,
          originTop: true,
          horizontalOrder:true,
          resize:true,
          gutter: 10,
          percentPosition: true,
          initLayout: true,
        }
  constructor(private apiService: ApiService) { }

  ngOnInit() {
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
  doItemModal(e:boolean) {
    this.openItemModal = e;
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
    console.log(this.masonryDivLeft)

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
}
