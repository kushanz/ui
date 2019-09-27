import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ClickOutsideModule } from 'ng-click-outside';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { WorkflowComponent } from './components/workflow/workflow.component';
import { FormsComponent } from './components/forms/forms.component';
import { NewRequestModalComponent } from './components/workflow/new-request-modal/new-request-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    WorkflowComponent,
    FormsComponent,
    NewRequestModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,ClickOutsideModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
