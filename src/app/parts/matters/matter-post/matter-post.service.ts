import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import {any} from "codelyzer/util/function";
import 'rxjs/add/operator/catch';
import {links} from "../../../stuff/links";

@Injectable()
export class MatterListService {

  constructor(private http: HttpClient) { }

  getMatters(): Observable<any[]> {
    return this.http.get('https://dashablog-55ba7.firebaseio.com/matters.json')
      .map((data) => {
        if (!data) {
          return [];
        }
        return Object.entries(data)
          .map(function ([id, value]) {
            const time = new Date().getTime();
            let diff = Math.ceil((new Date(value.timeover).getTime() - time)/(1000*60*60*24));
            let days = '';
            if (diff % 10 == 1) {
              days = ' день';
            } else if (diff % 10 == 2 || diff % 10 == 3 || diff % 10 == 4) {
              days = ' дня';
            } else {
              days = ' дней';
            }
            let priority = value.priority;
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

            if (diff < 0) {
              priority = "list-group-item list-group-item-secondary";
              icon = links.dead_icon;
              diff = 0;
            }
            const description = value.description.split('\n');
            const show = false;
            return Object.assign(value, {id, diff, days, priority, show, icon, description});
          })
      });
  }
}
