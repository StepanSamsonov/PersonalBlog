import { Injectable } from '@angular/core';

import { AngularFireDatabase } from "angularfire2/database";

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Injectable()
export class MatterFormService {

  constructor(private db: AngularFireDatabase) { }

  submitForm(form_values) {
    let {name, description, deadline, priority} = form_values;
    if (priority === 'Red') {
      priority = 'list-group-item list-group-item-danger';
    } else if (priority === 'Yellow') {
      priority = 'list-group-item list-group-item-warning';
    } else if (priority === 'Green') {
      priority = 'list-group-item list-group-item-success';
    }
    let formRequest = { name, description, deadline, priority };
    this.db.list('matters').push(formRequest);
  }
}
