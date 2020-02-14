import { Component, OnInit,Input} from '@angular/core';

@Component({
  selector: 'loader-error',
  templateUrl: './loader-error.component.html',
  styleUrls: ['./loader-error.component.css']
})
export class LoaderErrorComponent implements OnInit {
@Input('loaderror') public isLoaderror:boolean = false;
  constructor() { }

  ngOnInit() {
  }

}
