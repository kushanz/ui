import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ClickOutsideModule } from 'ng-click-outside';
import { AngularFireModule } from 'angularfire2';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { WorkflowComponent } from './components/workflow/workflow.component';
import { FormsComponent } from './components/forms/forms.component';
import { NewRequestModalComponent } from './components/workflow/new-request-modal/new-request-modal.component';
import { WorkflowItemModalComponent } from './components/workflow/workflow-item-modal/workflow-item-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    WorkflowComponent,
    FormsComponent,
    NewRequestModalComponent,
    WorkflowItemModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,ClickOutsideModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyBSbn9UPuCr1HM8pPwQzsiiUw0fGdP8Er4",
      authDomain: "ngfire-c122b.firebaseapp.com",
      databaseURL: "https://ngfire-c122b.firebaseio.com",
      projectId: "ngfire-c122b",
      storageBucket: "",
      messagingSenderId: "721709018601",
      appId: "1:721709018601:web:31b610176e4236e87baf78",
      measurementId: "G-000ZVF6D2G"
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
