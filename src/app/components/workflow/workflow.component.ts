import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'Workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.css']
})
export class WorkflowComponent implements OnInit {
  public openNewRequestModal:boolean = false;
  public openItemModal:boolean = false;
  public isExpandSearch:boolean = false;
  public isOpenAdvanceSearch:boolean = false;
  public isOpenSearchPanel:boolean = false;
  public isopenWorkspaceList:boolean = false;
  public received:boolean = false;
  public sent:boolean = false;
  public completed:boolean = false;
  public timeescalated:boolean = false;


  constructor() { }

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
  toggleWorkspaceList() {
    this.isopenWorkspaceList = !this.isopenWorkspaceList;
  }
  doSearch () {
    // search Action Goes Here
    this.isOpenSearchPanel = true;
  }
  doSearchClear () {
    // do clear all search values
    this.isOpenSearchPanel = false;
  }

}
