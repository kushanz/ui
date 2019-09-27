import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'new-request-modal',
  templateUrl: './new-request-modal.component.html',
  styleUrls: ['./new-request-modal.component.css']
})
export class NewRequestModalComponent implements OnInit {
  @Input('openModal') public openModal: boolean;
  @Output('closeModal') public closeModal:EventEmitter<boolean> = new EventEmitter<boolean>()
  public travelRequest:boolean = false;
  constructor() { }

  ngOnInit() {
  }
  close() {
    this.openModal = false;
    this.showTravelRequest("back");
    this.closeModal.emit(false);
  }

  showTravelRequest(state:string) {
    if(state == 'next') { this.travelRequest = true; }
    else if(state == 'back') { this.travelRequest = false;}
    else { this.travelRequest = false; }
  }

}
