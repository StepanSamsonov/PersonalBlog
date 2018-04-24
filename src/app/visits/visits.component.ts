import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-visits',
  template: '',
})
export class VisitsComponent {

  constructor(private db: AngularFireDatabase) { }

  get_form_date(date: Date): string {
    let res = date.getFullYear() + '/';
    const month = date.getMonth() + 1;
    if (month < 10) {
      res += '0' + month;
    } else {
      res += month;
    }
    res += '/';
    const day = date.getDate();
    if (day < 10) {
      res += '0' + day;
    } else {
      res += day;
    }
    return res;
  }

  updateVisitData() {
    this.db.object('const').valueChanges().subscribe(data => {
      const last_date = new Date((data as any).last_date);
      let last_date_form = this.get_form_date(last_date);
      const last_seconds = last_date.getTime() / 1000;
      const now_date = new Date();
      let now_date_form = this.get_form_date(now_date);
      const now_seconds = now_date.getTime() / 1000;
      let visit_data = (data as any).chart_data.split(' ').reverse().map(Number);
      if (now_date_form > last_date_form) {
        let diff_days = Math.floor((now_seconds - last_seconds)/(60*60*24));
        while (diff_days > 0) {
          visit_data.pop();
          visit_data.unshift(0);
          diff_days -= 1;
        }
        visit_data[0] = 1;
      } else if ((now_seconds - last_seconds) > 60*60) {
        visit_data[0] += 1;
      }
      this.db.object('const').update({last_date: now_date.toString(), chart_data: visit_data.reverse().join(' ')});
    });
  }
}
