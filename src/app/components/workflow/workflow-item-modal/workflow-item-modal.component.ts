import { Component, OnInit,Input,Output,EventEmitter,ViewChild,TemplateRef } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'workflow-item-modal',
  templateUrl: './workflow-item-modal.component.html',
  styleUrls: ['./workflow-item-modal.component.css']
})
export class WorkflowItemModalComponent implements OnInit {
  @ViewChild('wftoast',{static: false}) wftoast: TemplateRef<any>;
  @Input('openModal') public openModal: boolean;
  @Output('closeModal') public closeModal:EventEmitter<boolean> = new EventEmitter<boolean>()
  constructor(private _notifications: NotificationsService) { 

  }

  ngOnInit() {
  }
  close() {
    this.openModal = false;
    this.closeModal.emit(false);
  }
  toast() {
    // this._notifications.success(this.wftoast);
    this._notifications.success('Item created!', 'Click to undo...');
  }
}
