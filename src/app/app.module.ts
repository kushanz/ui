import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClickOutsideModule } from 'ng-click-outside';
// filters
import { wfSearchFilter } from './filters/newworkflow.filter';
// scrollbar add
import { PerfectScrollbarModule, PerfectScrollbarConfigInterface,PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
// add notification module
import { SimpleNotificationsModule } from 'angular2-notifications';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/common/sidebar/sidebar.component';
import { LoaderSvgComponent } from './components/common/loader-svg/loader-svg.component';

// workflow module
import { WorkflowComponent } from './components/workflow/workflow.component';
import { FormsComponent } from './components/forms/forms.component';
import { NewRequestModalComponent } from './components/workflow/new-request-modal/new-request-modal.component';
import { WorkflowItemModalComponent } from './components/workflow/workflow-item-modal/workflow-item-modal.component';


// Auth
import { AuthGuardService } from './auth-guards/auth-guard';
import { TokenInterceptor } from './auth-guards/token.interceptor';
// App services
import { ApiService } from './services/api.service';
import { NotificationHub } from './services/notification-hub.service';
import { GlobalEventsService } from './services/global-events.service';
import { GlobalVars } from './services/globalvars.service';
import { TrackService } from './services/track.service';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  wheelPropagation: true,
  suppressScrollX: true
};

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    WorkflowComponent,
    FormsComponent,
    NewRequestModalComponent,
    WorkflowItemModalComponent,
    LoaderSvgComponent,
    wfSearchFilter
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    // translation
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }),
    AppRoutingModule,ClickOutsideModule,PerfectScrollbarModule,BrowserAnimationsModule,SimpleNotificationsModule.forRoot({
      timeOut: 2000,
      theClass: 'wfnotify',
      showProgressBar: false,
      pauseOnHover: true,
      clickToClose: true,
      clickIconToClose: true
    })
  ],
  providers: [
    ApiService,
    NotificationHub,
    AuthGuardService,
    GlobalEventsService,
    GlobalVars,
    TrackService,
    GlobalEventsService,    
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}