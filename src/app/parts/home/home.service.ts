import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { AngularFireDatabase } from "angularfire2/database";

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { environment } from "../../../environments/environment";


@Injectable()
export class MainService {

  constructor(private db: AngularFireDatabase,
              private http: HttpClient) { }

  getConst() {
    return this.http.get(environment.firebase.databaseURL + '/const.json');
  }

  changeTime(time) {
    if (time != '') {
      this.db.object('const').update({time: time});
    }
  }

  changeEmail(email) {
    if (email != '') {
      this.db.object('const').update({email: email});
    }
  }

  updatePush(radios) {
    for (let i = 0, length = radios.length; i < length; i++) {
      if ((radios[i] as HTMLInputElement).checked)  {
        let push = (radios[i] as HTMLInputElement).value;

        this.db.object('const').update({push: push});
        return push;
      }
    }
  }

  static setInitialRadio(value) {
    let radios = document.getElementsByName('push_notifications');
    for (let i = 0, length = radios.length; i < length; i++) {
      if ((radios[i] as HTMLInputElement).value === value)  {
        (radios[i] as HTMLInputElement).checked = true;
      } else {
        (radios[i] as HTMLInputElement).checked = false;
      }
    }
  }
}
