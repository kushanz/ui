import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../services/api.service";

// models
import { InboxItem } from "../../models/inbox-item.model";
import { FormPermission, FormAssignment } from '../../models/workflow.model';

@Component({
  selector: 'Workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.css']
})
export class WorkflowComponent implements OnInit {
  public inboxItemTypes: string[] = ['Pending', 'Sent', 'Completed', 'TimeEscalated'];
  public selectedItem: string = 'Pending';
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

  public inboxItems: InboxItem[] = [];


  public formPermission: Array<FormPermission> = new Array<FormPermission>();
  public formPermissionIsLoading:boolean;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
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
    this.isOpenSearchPanel = true;
  }
  doSearchClear () {
    // do clear all search values
    this.isOpenSearchPanel = false;
  }
  // select tab item
  tabitemClick(item:string) {
    this.selectedItem = item;
    this.loadInboxItemsByType(item);
  }

  // ------------load inbox items with filter----------------------
  loadInboxItemsByType(type:any) {
    this.apiService.getInboxList(type).subscribe((data:any) => {
      this.inboxItems = data;
      this.inboxItems.map((item:  InboxItem) => {
        if( item.identityValues !== null){
          item.identityValues = JSON.parse( item.identityValues.toString());
        }
      })
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


}
