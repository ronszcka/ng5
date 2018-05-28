import { Component, OnInit } from '@angular/core';

import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';

import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [

    trigger('goals', [
      transition('* => *', [

        query(':enter', style({ opacity: 0}), { optional: true }),

        query(':enter', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({ opacity: 0, transform: 'translateY(-75%)', offset: 0, }),
            style({ opacity: .5, transform: 'translateY(35%)', offset: .3, }),
            style({ opacity: 1, transform: 'translateY(0%)', offset: 1, })
          ]))
        ]), { optional: true }),

        query(':leave', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({ opacity: 1, transform: 'translateY(0%)', offset: 0, }),
            style({ opacity: .5, transform: 'translateY(35%)', offset: .3, }),
            style({ opacity: 0, transform: 'translateY(-75%)', offset: 1, })
          ]))
        ]), { optional: true })

      ])
    ])

  ]
})
export class HomeComponent implements OnInit {

  public itemCount: number;
  public btnText: string;
  public goalText: string;

  public goals;

  constructor(private _data: DataService) {

    this.btnText = 'Add an item';
    this.goalText = 'My first life goal';

  }

  ngOnInit() {
    this._data.goal.subscribe(res => this.goals = res);
    this.itemCount = this.goals.length;
    this._data.changeGoal(this.goals);
  }

  public addItem() {
    this.goals.push(this.goalText);
    this.goalText = '';
    this.itemCount = this.goals.length;
    this._data.changeGoal(this.goals);
  }

  public removeItem(index: number) {
    this.goals.splice(index, 1);
    this.itemCount = this.goals.length;
    this._data.changeGoal(this.goals);
  }

}
