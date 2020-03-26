import { Component, OnInit,Input,Output,EventEmitter,ViewChild,TemplateRef, HostListener } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';

import { InboxItem } from "../../../models/inbox-item.model";
import { environment } from "../../../../environments/environment";

@Component({
  selector: 'workflow-item-modal',
  templateUrl: './workflow-item-modal.component.html',
  styleUrls: ['./workflow-item-modal.component.css']
})
export class WorkflowItemModalComponent implements OnInit {
  @ViewChild('wftoast') wftoast: TemplateRef<any>;
  @Input('openModal') public openModal: boolean;
  @Input('inboxitem') public inboxitem:InboxItem;
  @Output('closeModal') public closeModal:EventEmitter<boolean> = new EventEmitter<boolean>()
  innerWidth:number;
  @HostListener('window:resize', ['$event'])
    onResize(event) {
    this.innerWidth = window.innerWidth;
}
  formUrl:string;
  historyUrl:string
  maximize:boolean = false;
  historymode:boolean = false;

  constructor(private _notifications: NotificationsService) { 
  }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
  }

  ngOnChanges(changes:{openModal:boolean}) {
    this.historymode = false
    if(this.openModal==true) {
      this.loadURl(this.inboxitem)
    }
}

  close() {
    this.openModal = false;
    this.closeModal.emit(false);
  }
  max() {
    this.maximize = !this.maximize
  }
  toast() {
    // this._notifications.success(this.wftoast);
    this._notifications.success('Item created!', 'Click to undo...');
  }

  loadURl(item:InboxItem) {
    const jsonData = JSON.parse(item.data);
    this.formUrl = jsonData.url;
    console.log(this.formUrl)
  }

  toggleHistoryMode() {
    this.historymode = !this.historymode;
    if(this.historymode) {
      this.historyUrl = environment.statViewerHost+"/workflows/runningpath/"+this.inboxitem.workflowInstaceId;
    }
  }
}
