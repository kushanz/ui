import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import {trigger,transition,style,animate,query,group} from '@angular/animations';
import { DomSanitizer,SafeResourceUrl } from "@angular/platform-browser";
// import {trigger,transition,style,animate} from '@angular/animations';
import { ApiService } from "../../../services/api.service";
import { FormPermission } from '../../../models/workflow.model';


@Component({
  selector: 'new-request-modal',
  templateUrl: './new-request-modal.component.html',
  styleUrls: ['./new-request-modal.component.css']
  // animations:[
  //   trigger('delete-fade', [
  //     transition('void=>*',[style({opacity:0,transform:'translateY(10px)'}),animate(400)]),
  //     transition('*=>void',[animate(400,style({opacity:0,transform:'translateY(30px)'}))])
  //   ])
  // ]
  // animations:[
    // trigger('modalAnimate', [
    //   transition('void=>*',[style({opacity:0,transform:'scale(0.9)'}),animate(500)]),
    //   transition('*=>void',[animate(500,style({opacity:0,transform:'scale(0.9)'}))])
    // ]),
  //   trigger(
  //         'fadeAnimation', [
  //           transition( ':enter',[style({ opacity: 0 }), animate('.2s ease-out', style({ opacity: 1 })),query('.modalContainer',[
  //             style({opacity:0,transform:'scale(0.9)'}),
  //             group([animate(300,style({opacity:1,transform:'scale(1)'}))])
  //           ]) ] ),
  //           transition( ':leave',[style({ opacity: 1 }),animate('.2s ease-in',style({ opacity: 0 })),query('.modalContainer',[
  //             style({opacity:1,transform:'scale(1)'}),
  //             group([animate(300,style({opacity:0,transform:'scale(0.9)'}))])
  //           ]) ] )
  //         ])
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
  @Input('formPermission') public formPermission:Array<FormPermission>;
  @Input('formPermissionIsLoading') public formPermissionIsLoading:boolean;
  @Output('closeModal') public closeModal:EventEmitter<boolean> = new EventEmitter<boolean>()
  public isNewWorkFlow:boolean = false;
  public newWorkFlowSearch:string ="";
  public selectedWorkFlow:any = {};
  public formUrl:any = "";
  public maximize:boolean;
  constructor(private apiService: ApiService, private sanitizer: DomSanitizer) { }

  ngOnInit() {}
  close() {
    this.openModal = false;
    this.newWorkFlowSearch = "";
    this.formUrl = "";
    this.selectedWorkFlow = {};
    this.showTravelRequest("back");
    this.closeModal.emit(false);
  }
  cancel() {
    this.formUrl = "";
    this.selectedWorkFlow = {};
  }

  showTravelRequest(state:string) {
    if(state == 'next' && Object.keys(this.selectedWorkFlow).length>0) { 
      this.isNewWorkFlow = true;
      this.formPermissionIsLoading = true;
      this.apiService.getRenderingUrl(this.selectedWorkFlow).subscribe((url:string)=>{
        this.formUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        this.formPermissionIsLoading = false;
      })

    } else if(state == 'back') { this.isNewWorkFlow = false;}
    else { this.isNewWorkFlow = false; }
  }
  isEmptyObject(selectedWorkFlow) {
    return (selectedWorkFlow && (Object.keys(selectedWorkFlow).length === 0));
  }
  // new workflow list item onclick
  public NewWorkFlowItemOnClick(permission) {
    this.selectedWorkFlow = permission;
    // this.apiService.getRenderingUrl(permission).subscribe((url:string)=>{
    //   console.log(url)
    //   this.formUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    // })
  }
  // maximise minimize modal window
  public resizeModal():void {
    this.maximize = !this.maximize;
  }

}
