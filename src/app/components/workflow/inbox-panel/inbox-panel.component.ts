import { Component, OnInit,Input,Output,EventEmitter, ViewChild } from '@angular/core';
import { SwiperDirective, SwiperConfigInterface, SwiperPaginationInterface } from 'ngx-swiper-wrapper';
// import { SwiperDirective  } from 'ngx-swiper-wrapper'
import { InboxItem } from "../../../models/inbox-item.model";

@Component({
  selector: 'inbox-panel',
  templateUrl: './inbox-panel.component.html',
  styleUrls: ['./inbox-panel.component.css']
})
export class InboxPanel implements OnInit {

  @Input() openPanel:boolean
  @Input() inboxItems:InboxItem[]
  @Input() loader:boolean
  @Output() closePanel:EventEmitter<boolean> = new EventEmitter<boolean>()
  @ViewChild(SwiperDirective) directiveRef?: SwiperDirective;

  private pagination: SwiperPaginationInterface = {
    el: '.swiper-pagination',
    clickable: true
  };
  constructor() { }

  ngOnInit() {

  }
  ngOnChanges(changes:{[inboxItems:string]:Array<any>}) {
    if(changes['inboxItems']) {
      setTimeout(()=> this.directiveRef.setIndex(0),400)
      // if(this.directiveRef) this.directiveRef.setIndex(0);
    }
}

  public slider_config: SwiperConfigInterface = {
    a11y: true,
    speed:150,
    direction: 'horizontal',
    slidesPerView: 4,
    keyboard: true,
    mousewheel: true,
    scrollbar: false,
    navigation: true,
    pagination: this.pagination,
    observer:true,
  }
  // public slider_config: SwiperConfigInterface = {
  //   direction: 'horizontal',
  //   slidesPerView: 3,
  //   pagination: true,
  //   // freeMode:true,
  //   spaceBetween: 15,
  //   observer:true,
  //   mousewheel: true,
  //   // slidesPerGroup: 3,
  //   // pagination: true,
  //   // centeredSlides: true,
  //   navigation: {
  //     nextEl: '.swiper-button-next',
  //     prevEl: '.swiper-button-prev',
  //   },
  //   // noSwiping: true
  //   slidesOffsetBefore: 20,
  //   slidesOffsetAfter: 20,
  // };

  close() { 
    this.directiveRef.setIndex(0)
    this.openPanel = false;
    this.closePanel.emit(true);
  }


}
