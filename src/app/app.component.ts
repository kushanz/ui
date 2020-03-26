import { Component } from '@angular/core';
import { NotificationHub } from './services/notification-hub.service';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from './services/api.service';
import { ApplicationUserSettings } from './models/application-user-settings.model';
import { OnInit } from "@angular/core";
import { AppLink } from './models/sub-app';
import { DomSanitizer } from '@angular/platform-browser';
import { UserWithCredentials } from './models/user-with-credentials';
import { AuthGuardService } from './auth-guards/auth-guard';
import { Router } from '@angular/router';
import { GlobalEventsService } from './services/global-events.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // public isMobile:boolean = false;
   // GLOBAL NAVIGATION
   public userWithCredentials: UserWithCredentials = new UserWithCredentials()
   public subApps: Array<AppLink>
   public currentApp: AppLink
   public isLoading: boolean = true
   public hasAppInitialized: boolean = false
   language: ApplicationUserSettings = new ApplicationUserSettings();
   selectLanguage: string;

  constructor(private _sanitizer: DomSanitizer, private ng: NotificationHub, private translate: TranslateService,
    private apiService: ApiService, private apiServie: ApiService,private router:Router, private globalEventsService:GlobalEventsService) { }

  ngOnInit():void {
    this.globalEventsService.getEvent().subscribe(r=>{
      if(r.name == "app_initialized"){

        this.loadInitializationData()
      }
    })
  }

  // ---------------------------------------global init-------------------
public loadInitializationData(){
  this.apiService.getInitializationData().subscribe((result: any) => {
    if (result !== null) {
      this.userWithCredentials = result.userWithCredentials as UserWithCredentials
      if(this.userWithCredentials.isAdministrator){
        this.loadAppLinks()
      }
      this.language = result.language;
      this.translate.setDefaultLang(this.language.value);
    } else {
      this.apiService.changeLanguage({ value: 'en' } as ApplicationUserSettings).subscribe((result: any) => {
        this.translate.setDefaultLang(this.language.value);
      });
    }
  });
}
public loadAppLinks(){
    // GLOBAL NAVIGATION LOADING APPLINKS
    this.apiService.getAppLinks().subscribe(result => {
      this.subApps = result as Array<AppLink>
      this.subApps.forEach(app => {
        app.link = this.sanitize(app.link)
      })
      this.currentApp = this.subApps.filter(app => app.appId == 'user-workspace')[0]
    })
    // GLOBAL NAVIGATION
}
public currentLanguage($event: any) {
this.selectLanguage = $event;
this.translate.setDefaultLang(this.selectLanguage);
}
/// GLOBAL NAVIGATION
public appSelected(app: AppLink) {

if (app.appId != this.currentApp.appId) {
  this.currentApp = app
  console.log(this.currentApp)
  if(app.appId == 'dashboard'){
      this.router.navigate(['/home']);
  }else if(app.appId == 'user-workspace'){
    this.router.navigate(['/inbox']);
  }
  else{
    window.open(app.link, '_blank');
  }
}
}
public sanitize(url) {
  //var r = this._sanitizer.bypassSecurityTrustResourceUrl(url);
  return url
}
// ---------------------------------------------------------------------
  
}
