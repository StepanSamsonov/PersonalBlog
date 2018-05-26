import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { AngularFireDatabase } from "angularfire2/database";

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { environment } from "../../environments/environment";


@Injectable()
export class VisitService {

  constructor(private db: AngularFireDatabase,
              private http: HttpClient) { }

  static get_form_date(date: Date): string {
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

  getConst() {
    return this.http.get(environment.firebase.databaseURL + '/const.json');
  }

  updateConst(now_date, visit_data) {
    this.db.object('const').update({last_date: now_date, chart_data: visit_data});
  }

  static calcTime(data) {
    const last_date = new Date((data as any).last_date);
    let last_date_form = VisitService.get_form_date(last_date);
    const last_seconds = last_date.getTime() / 1000;
    const now_date = new Date();
    let now_date_form = VisitService.get_form_date(now_date);
    const now_seconds = now_date.getTime() / 1000;
    let visit_data = (data as any).chart_data.split(' ').reverse().map(Number);
    if (now_date_form > last_date_form) {
      let diff_days = Math.ceil((now_seconds - last_seconds)/(60*60*24));
      while (diff_days > 0) {
        visit_data.pop();
        visit_data.unshift(0);
        diff_days -= 1;
      }
      visit_data[0] = 1;
    } else if ((now_seconds - last_seconds) > 60*60) {
      visit_data[0] += 1;
    }
    return {
      now_date: now_date.toString(),
      visit_data: visit_data.reverse().join(' ')
    }
  }
}
