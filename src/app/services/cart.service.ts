import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CartService {
  private subject = new Subject<void>();

  sendClickEvent() {
    this.subject.next();
  }

  getClickEvent(): Observable<any> {
    return this.subject.asObservable();
  }
}