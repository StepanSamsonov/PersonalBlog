import { Injectable } from '@angular/core';

import { AngularFireDatabase } from "angularfire2/database";

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Injectable()
export class ThoughtsFormService {

  constructor(private db: AngularFireDatabase) { }

  submitForm(form_values) {
    let {title, text} = form_values;
    const time = new Date();
    const date = time.getDate() + "/" + (time.getMonth()+1) + "/" + time.getFullYear();
    let formRequest = { title, text, date };
    this.db.list('blog').push(formRequest);
  }
}
