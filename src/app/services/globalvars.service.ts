import { Injectable,EventEmitter, Output } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable()
export class GlobalVars {
    private messageSource = new BehaviorSubject('default message');
    currentMessage = this.messageSource.asObservable();
    private user = new BehaviorSubject<User>(new User())

    setUser(user:User) {
        this.user.next(user);
    }

    getUser(): Observable<User> {
        return this.user.asObservable()
    }

    addopenUrl(event : string): any {
        this.messageSource.next(event)
    }

}