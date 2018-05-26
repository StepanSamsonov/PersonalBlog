import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { AngularFireDatabase } from "angularfire2/database";

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { environment } from "../../environments/environment";
import {links} from "../stuff/links";


@Injectable()
export class NotificationsService {

  constructor(private db: AngularFireDatabase,
              private http: HttpClient) { }

  getRoot() {
    return this.http.get(environment.firebase.databaseURL + '/.json');
  }

  static prepareData(data) {
    let notify_data = [];
    const remind_period = 5;
    const time_notify = 2000;
    const time = (data as any).const.time.split(':');
    const hours_to_remind = parseInt(time[0]);
    const minutes_to_remind = parseInt(time[1]);
    const use_notify = (data as any).const.push === 'true';
    const now = new Date();
    if (hours_to_remind === now.getHours() && minutes_to_remind === now.getMinutes() && use_notify) {
      let matters = (data as any).matters;

      for (let id in matters) {
        let {description, icon, name, priority, deadline} = matters[id];
        const now = new Date().getTime();
        const end = new Date(deadline).getTime();
        let diff = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
        let days = '';
        if (diff % 10 == 1) {
          days = ' день';
        } else if (diff % 10 == 2 || diff % 10 == 3 || diff % 10 == 4) {
          days = ' дня';
        } else {
          days = ' дней';
        }
        if (diff < remind_period && diff > 0) {
          const closeDelay = time_notify;
          const title = "Внимание!";
          const body = name + "\nОсталось: " + diff + days;
          let icon = '';
          if (priority.indexOf('success') != -1) {
            icon = links.green_notification_icon;
          }
          if (priority.indexOf('warning') != -1) {
            icon = links.yellow_notification_icon;
          }
          if (priority.indexOf('danger') != -1) {
            icon = links.red_notification_icon;
          }
          notify_data.push({closeDelay: closeDelay, title: title, body: body, icon: icon});
        }
      }
    }
    return notify_data;
  }
}
