import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import { AngularFireDatabase } from "angularfire2/database";

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';



@Injectable()
export class ThoughtsListService {

  constructor(private http: HttpClient,
              private db: AngularFireDatabase) { }


  getThoughts(): Observable<any[]> {
    return this.http.get('https://dashablog-55ba7.firebaseio.com/blog.json')
      .map((data) => {
        if (!data) {
          return [];
        }
        return Object.entries(data)
          .reverse()
          .map(function ([id, value]) {
            let text = value.text;
            if (!text) {
              text = '';
            }
            let title = value.title;
            if (!title) {
              title = '';
            }
            const ptext = text.split('\n');
            const show = false;
            return Object.assign(value, {id, ptext, show, text, title});
          })
      });
  };

  deletePost(id) {
    this.db.object('blog/' + id ).remove();
  }

  updatePost(id, values) {
    let {title, text} = values;
    if (title != '') {
      this.db.object('blog/' + id).update({title: title});
    }
    if (text != '') {
      this.db.object('blog/' + id).update({text: text});
    }
  }

  static changeFormOpenness(id, thoughts) {
    for (let i=0; i<thoughts.length; ++i) {
      if (thoughts[i].id == id) {
        thoughts[i].show = !thoughts[i].show;
        if (thoughts[i].show) {
          for (let j=0; j<thoughts.length; ++j) {
            if (i != j) {
              thoughts[j].show = false;
            }
          }
        }
        break;
      }
    }
  }
}
