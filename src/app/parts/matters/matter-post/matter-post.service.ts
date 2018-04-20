import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import {any} from "codelyzer/util/function";
import 'rxjs/add/operator/catch';

@Injectable()
export class MatterListService {

  constructor(private http: HttpClient) {
  }

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
            if (diff < 0) {
              priority = "list-group-item list-group-item-secondary";
              diff = 0;
            }
            const show = false;
            return Object.assign(value, {id, diff, days, priority, show});
          })
      });
  }
}
