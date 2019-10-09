import { Injectable } from "@angular/core";
import { Observable } from "rxjs/";
import { OnInit } from "@angular/core";
import { HubConnectionBuilder } from "@aspnet/signalr";
import { environment } from "../../environments/environment";
import { InboxItem } from "../models/inbox-item.model";

@Injectable()
export class NotificationHub {

    public inboxItemObservable: Observable<any>
    public workflowObservable: Observable<any>
    constructor() {
    }

    public StartListening(){
          let connection = new HubConnectionBuilder()
          .withUrl(environment.basePath+"/notificationHub")
          .build();
      this.inboxItemObservable = Observable.create(subscriber => {

//         setInterval(()=>{
//             console.log("sending")
//             let newone={"id":5252342,
//             "userReferenceId":"eyJ0ZW5hbnRJZCI6MSwidXNlcklkIjoxM30=",
//             "caption":"fFFFFF | 15375",
//             "type":"open_url",
//             "data":"{\"url\":\"https://zen.enadoc.com:8080/formsviewerui/?renderingToken=26022855-d65d-4ba7-92a5-7308012f1e9c6c4afdf6-65cd-47a6-a554-e645b9b857a0\",\"type\":\"inbox_iframe\"}","filterType":"Pending",
//             "workflowInstaceId":15375,
//             "taskId":"13988",
//             "completedBy":null,
//             "submissionId":null,
//             "identityValues":null,
//             "userInvolvements":[{"id":0,"user":{"username":"admin","firstname":"System","lastname":"Admin","tenatId":0,"email":null,"userReferenceId":null,"reportingPerson":null,"reportingPersonFirstName":null,"reportingPersonLastName":null,"id":0,"createdOn":null}}],"userInvolvementsJsonString":"[{\"id\":0,\"user\":{\"username\":\"admin\",\"firstname\":\"System\",\"lastname\":\"Admin\",\"tenatId\":0,\"email\":\"enadocmadushi@gmail.com\",\"userReferenceId\":\"eyJ0ZW5hbnRJZCI6MSwidXNlcklkIjoxM30=\",\"reportingPerson\":null,\"reportingPersonFirstName\":null,\"reportingPersonLastName\":null,\"id\":0,\"createdOn\":null}}]", 
//             time:null,
//             date:null} as InboxItem
//             subscriber.next(newone)
//         },4000)

          connection.on("ReceiveInboxItem", inboxItem => {
              subscriber.next(inboxItem)
              console.log("inbox item received", inboxItem)
          })
      })
      this.workflowObservable = Observable.create(subscriber => {
          connection.on("ReceiveWorkflows", wf => {
              subscriber.next(wf)
          })
      })

      connection.start()
          .then(() => {
              let userId = localStorage.getItem('userReferenceId');
              connection.invoke("EstablishConnection", userId)
              console.log("Connection is started");

      }) .catch(err => {
          console.log('Error while establishing connection, retrying...');
        });;

    }

    public GetInboxItemsObservable(): Observable<any> {
        
        return this.inboxItemObservable;
    }

    public GetWorkflowsObservable(): Observable<any> {
        return this.workflowObservable;
    }
}
