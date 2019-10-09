import { Component, OnInit, Output,Input,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Input('isMobile') public isMobile: boolean;
  @Output('closeSidebar') public CloseSidebar:EventEmitter<boolean> = new EventEmitter<boolean>()
  constructor() { }

  ngOnInit() {

  }
  doSidebar(e:boolean):void {
    this.isMobile = e;
    if(e==false) {
      this.CloseSidebar.emit(false);
    }
  }
  clickOutSideCloseSidebar() {
    this.isMobile = false;
    this.CloseSidebar.emit(false);
  }

}
