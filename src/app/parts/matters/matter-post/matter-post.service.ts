import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import {AngularFireDatabase} from "angularfire2/database";

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { environment } from "../../../../environments/environment";
import { links } from "../../../stuff/links";


@Injectable()
export class MatterListService {

  constructor(private db: AngularFireDatabase,
              private http: HttpClient) { }

  getMatters(): Observable<any[]> {
    return this.http.get(environment.firebase.databaseURL + '/matters.json')
      .map((data) => {
        if (!data) {
          return [];
        }
        return Object.entries(data)
          .map(function ([id, value]) {
            const time = new Date().getTime();
            let diff = Math.ceil((new Date(value.deadline).getTime() - time)/(1000*60*60*24));
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

  static changeFormOpenness(id, matters) {
    for (let i=0; i<matters.length; ++i) {
      if (matters[i].id == id) {
        matters[i].show = !matters[i].show;
        if (matters[i].show) {
          for (let j=0; j<matters.length; ++j) {
            if (i != j) {
              matters[j].show = false;
            }
          }
        }
        break;
      }
    }
  }

  updatePostData(id, form_values) {
    let {name, description, deadline, priority} = form_values;
    if (name != '') {
      this.db.object('matters/' + id).update({name: name});
    }
    if (description != '') {
      this.db.object('matters/' + id).update({description: description});
    }
    if (deadline != '') {
      this.db.object('matters/' + id).update({deadline: deadline});
    }
    if (priority != '') {
      let icon = '';
      if (priority === 'Red') {
        priority = 'list-group-item list-group-item-danger';
        icon = links.red_notification_icon;
      } else if (priority === 'Yellow') {
        priority = 'list-group-item list-group-item-warning';
        icon = links.yellow_notification_icon;
      } else if (priority === 'Green') {
        priority = 'list-group-item list-group-item-success';
        icon = links.green_notification_icon;
      }
      this.db.object('matters/' + id).update({priority: priority, icon: icon});
    }
  }

  deleteForm(id) {
    this.db.object('matters/' + id ).remove();
  }
}
