import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private goals = new BehaviorSubject<any>(['A', 'B']);

  goal = this.goals.asObservable();

  constructor() { }

  public changeGoal(goal) {
    this.goals.next(goal);
  }

}
