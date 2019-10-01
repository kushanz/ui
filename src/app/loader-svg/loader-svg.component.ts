import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'loader-svg',
  templateUrl: './loader-svg.component.html',
  styleUrls: ['./loader-svg.component.css']
})
export class LoaderSvgComponent implements OnInit {
@Input('show') public isShow:boolean = false;
  constructor() { }

  ngOnInit() {
  }

}
