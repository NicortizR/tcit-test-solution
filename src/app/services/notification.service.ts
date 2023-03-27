import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class NotificationService {
    private successMessageSubject = new Subject<String>();
    private alertMessageSubject = new Subject<String>();

    successMessageAction$ = this.successMessageSubject.asObservable();
    alertMessageAction$ = this.alertMessageSubject.asObservable();

    setSuccessMessage(message:string) {
        this.successMessageSubject.next(message); 
    }

    setAlertMessage(message:string) {
        this.alertMessageSubject.next(message); 
    }

    clearSuccessMessage() {
        this.setSuccessMessage('');
    }

    clearAlertMessage() {
        this.setAlertMessage('');
    }
}