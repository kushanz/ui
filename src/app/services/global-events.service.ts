import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable()
export class GlobalEventsService {
  private subject = new Subject<any>();

  sendEvent(message: string) {
    this.subject.next({ name: message });
  }

  clearEvent() {
      this.subject.next();
  }

  getEvent(): Observable<any> {
      return this.subject.asObservable();
  }
}
