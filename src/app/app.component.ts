import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public isMobile:boolean = false;

  constructor() { }

  ngOnInit():void {

  }
  doSidebar(e:boolean):void {
    this.isMobile = e;
  }
  
}
