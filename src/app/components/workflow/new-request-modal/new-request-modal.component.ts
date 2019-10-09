import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import {trigger,transition,style,animate} from '@angular/animations';

@Component({
  selector: 'new-request-modal',
  templateUrl: './new-request-modal.component.html',
  styleUrls: ['./new-request-modal.component.css'],
  // animations:[
  //   trigger('modalAnimate', [
  //     transition('void=>*',[style({opacity:0,transform:'scale(0.9)'}),animate(500)]),
  //     transition('*=>void',[animate(500,style({opacity:0,transform:'scale(0.9)'}))])
  //   ])
  // ]
  // animations: [
  //   trigger(
  //     'fadeAnimation', [
  //       transition( ':enter',[style({ opacity: 0 }), animate('.2s ease-out', style({ opacity: 1 })) ] ),
  //       transition( ':leave',[style({ opacity: 1 }),animate('.2s ease-in',style({ opacity: 0 })) ] )
  //     ]),
  //     trigger('modalAnimate', [
  //     transition(':enter',[style({opacity:0,transform:'scale(0.95)'}),animate('0.2s 0.1s',style({opacity:1,transform:'scale(1)'}))]),
  //     transition(':leave',[style({ opacity: 1,transform:'scale(1)' }),animate('0.2s 0.1s',style({ opacity: 0,transform:'scale(0.95)' })) ])
  //   ])
  // ]
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
