import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import {any} from "codelyzer/util/function";
import 'rxjs/add/operator/catch';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AngularFireDatabase} from "angularfire2/database";

@Injectable()
export class ThinkingsListService {

  constructor(private http: HttpClient) {
  }

  getThinkings(): Observable<any[]> {
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
}
