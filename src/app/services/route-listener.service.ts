import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RouteListenerService {
  currentRoute = new BehaviorSubject<any>([]);

  constructor() {}
}
