import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'workflow-item-modal',
  templateUrl: './workflow-item-modal.component.html',
  styleUrls: ['./workflow-item-modal.component.css']
})
export class WorkflowItemModalComponent implements OnInit {
  @Input('openModal') public openModal: boolean;
  @Output('closeModal') public closeModal:EventEmitter<boolean> = new EventEmitter<boolean>()
  constructor() { }

  ngOnInit() {
  }
  close() {
    this.openModal = false;
    this.closeModal.emit(false);
  }
}
