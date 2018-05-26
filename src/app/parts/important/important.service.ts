import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs/Rx";

import { environment } from "../../../environments/environment";
import {AngularFireDatabase} from "angularfire2/database";


@Injectable()
export class ImportantService {

  constructor(private http: HttpClient,
              private db: AngularFireDatabase) { }

  getCatalog(current_dir: string): Observable<any[]> {
    return this.http.get(environment.firebase.databaseURL + '/' + current_dir + '.json')
      .map((data) => {
        if (!data) {
          return [];
        }
        return Object.entries(data)
          .map(function ([id, value]) {
            return Object.assign(value, {id});
          })
      });
  }

  getFile(current_dir, id) {
    return this.http.get(environment.firebase.databaseURL + '/' + current_dir + '/' + id + '.json');
  }

  createElement(form_values, current_dir) {
    let {name, type} = form_values;
    if (type === 'catalog') {
      this.db.list(current_dir).push({name: name, type: type});
    }
    if (type === 'file') {
      this.db.list(current_dir).push({name: name, type: type, text: ''});
    }
  }

  delDir(current_dir, id, name) {
    this.db.object(current_dir + '/' + id).remove();
    this.db.object(current_dir + '/' + name).remove();
  }

  delFile(current_dir, id) {
    this.db.object(current_dir + '/' + id).remove();
  }

  changeFile(form_values, current_dir, id) {
    let {name, text} = form_values;
    if (name != '') {
      this.db.object(current_dir + '/' + id).update({name: name});
    }
    if (text != '') {
      this.db.object(current_dir + '/' + id).update({text: text});
    }
  }

  static openFile(data, id, special_counter, content_id) {
    if (data) {
      let content_title = (data as any).name;

      if (id === content_id) {
        special_counter += 1;
      } else {
        special_counter = 0;
      }
      let content;
      if (special_counter % 2 === 1) {
        content = [];
      } else {
        content = (data as any).text.split('\n');
      }
      let content_id_before = content_id;
      content_id = id;

      return {content_title: content_title,
              content_id: content_id,
              content_id_before: content_id_before,
              content: content,
              special_counter: special_counter};
    } else {
      return {
        content_title: '',
        content_id: 'content id',
        content_id_before: 'content id before',
        content: '',
        special_counter: 0
      };
    }
  }
}
