import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ClickOutsideModule } from 'ng-click-outside';
// scrollbar add
import { PerfectScrollbarModule, PerfectScrollbarConfigInterface,PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { WorkflowComponent } from './components/workflow/workflow.component';
import { FormsComponent } from './components/forms/forms.component';
import { NewRequestModalComponent } from './components/workflow/new-request-modal/new-request-modal.component';
import { WorkflowItemModalComponent } from './components/workflow/workflow-item-modal/workflow-item-modal.component';
import { LoaderSvgComponent } from './loader-svg/loader-svg.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  wheelPropagation: true
};

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    WorkflowComponent,
    FormsComponent,
    NewRequestModalComponent,
    WorkflowItemModalComponent,
    LoaderSvgComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,ClickOutsideModule,PerfectScrollbarModule
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
