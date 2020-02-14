import { Injectable, Inject } from '@angular/core';
import { Router, CanActivate, ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { DOCUMENT } from '@angular/common';
import { GlobalVars } from '../services/globalvars.service';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';
import { NotificationHub } from '../services/notification-hub.service';
import { GlobalEventsService } from '../services/global-events.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  public initializedOnce: boolean = false;
  public static token: string = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJVc2VyUmVmZXJlbmNlSWQiOiJleUowWlc1aGJuUkpaQ0k2TVN3aWRYTmxja2xrSWpveE0zMD0iLCJVc2VyTmFtZSI6ImFkbWluIiwiRW1haWwiOiJlbmFkb2NtYWR1c2hpQGdtYWlsLmNvbSIsIkZpcnN0TmFtZSI6IlN5c3RlbSIsIkxhc3ROYW1lIjoiQWRtaW4iLCJUZW5hbnRJZCI6MX0.gROfCecEgen0HFgiJ9hiNIWZX4ZqjEVRIJv5yYtlpRs';
  code: string = "";
  jwt: any = {};
  public static isSignOut : boolean = false;

  constructor(public router: Router, private activeRoute: ActivatedRoute, private apiService: ApiService,
    @Inject(DOCUMENT) private document: any, private globalVars: GlobalVars, private translate: TranslateService, private notificationHub: NotificationHub, private globalEventsService: GlobalEventsService) {
  }
  async canActivate(): Promise<boolean> {
    console.log("AUTHGUARD HIT ", "Initialized " + this.initializedOnce)
    if (!this.initializedOnce) {
      await this.getBasePath();
      await this.getStatViewerBasePath();
    }



    const path = window.location.href;
    if (path.indexOf('code') > 0 && !AuthGuardService.isSignOut) {
      const splitted = path.split('=');
      this.code = splitted[splitted.length - 1];
    }

    //let token = localStorage.getItem('token');
    // Check whether the token is expired and eturn
    // true or false
    if (AuthGuardService.token === null || AuthGuardService.token === '') {
      if (this.code === "") {
        this.router.ngOnDestroy();
        this.apiService.getLoginUrl().subscribe((response) => {
          this.document.location.href = response;
        }, (error) => {
          console.log(error);
        })
        return false;
      } else {
        this.apiService.getEnadocJwt(this.code).subscribe((response: any) => {
          let token = response.tempJwt.toString() || '';
          //localStorage.setItem('token', token);
          AuthGuardService.token = token;
          localStorage.setItem('userReferenceId', response.userReferenceId.toString());
          this.translate.setDefaultLang('en');
          // this.router.navigate(['workflow']);

          return true;
        });
      }
    } else {
      let user = JSON.parse(atob(AuthGuardService.token.split('.')[1]));
      let globalUser: User = new User()
      globalUser.userName = user.UserName;
      globalUser.email = user.Email;
      globalUser.userReferenceId = user.UserReferenceId;
      globalUser.tenantId = user.TenantId;
      globalUser.firstName = user.FirstName;
      globalUser.lastName = user.LastName;
      this.globalVars.setUser(globalUser);

      if (!this.initializedOnce) {
        this.globalEventsService.sendEvent("app_initialized")
        this.notificationHub.StartListening()
        this.initializedOnce = true
      }
      return true;
    }
    return false;
  }

  async getBasePath() {
    var promise = new Promise((resolve, reject) => {

      function reqListener() {

        if (oReq.status == 200) {
          var resultText = this.responseText
          // var lines=resultText.split('\n')
          // var value=lines.filter(line=>{
          //   if(line.split(',')[0]==='user_workspace_api'){
          //     return true
          //   }
          // })[0]
          // var value3=lines.filter(line=>{
          //   if(line.split(',')[0]==='stat_viewer_api'){
          //     return true
          //   }
          // })[0]
          // var value2=value.split(',')[1].toString().replace('\r','')
          // var value4=value3.split(',')[1].toString().replace('\r','')
          environment.basePath = resultText
          resolve(resultText)
        } else {
          resolve()
        }
      }

      var oReq = new XMLHttpRequest();
      oReq.addEventListener("load", reqListener);
      oReq.open("GET", 'assets/apihost');
      oReq.send();


    })
    return promise
  }
  async getStatViewerBasePath() {
    var promise = new Promise((resolve, reject) => {

      function reqListener() {

        if (oReq.status == 200) {
          var resultText = this.responseText
          environment.statViewerHost = resultText
          resolve(resultText)
        } else {
          resolve()
        }
      }

      var oReq = new XMLHttpRequest();
      oReq.addEventListener("load", reqListener);
      oReq.open("GET", 'assets/statviewerui');
      oReq.send();


    })
    return promise
  }

   async clearToken() {
    var promise = new Promise((resolve, reject) => {
      this.code = "";
      AuthGuardService.token = null;
      AuthGuardService.isSignOut = true;
      resolve();
    })

    return promise

  }

}
