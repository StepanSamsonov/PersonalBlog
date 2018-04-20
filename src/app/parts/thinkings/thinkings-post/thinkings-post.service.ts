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

  getThinkings(page: number): Observable<any[]> {
    return this.http.get('https://dashablog-55ba7.firebaseio.com/blog.json')
      .map((data) => {
        if (!data) {
          return [];
        }
        return Object.entries(data)
          .reverse()
          .slice(page*5, Math.min(page*5+5, Object.entries(data).length))
          .map(function ([id, value]) {
            const ptext = value.text.split('\n');
            const show = false;
            return Object.assign(value, {id, ptext, show});
          })
      });
  };

  getPagesCount(): any {
    return this.http.get('https://dashablog-55ba7.firebaseio.com/count_pages.json')
      // .map((data) => {
      //   return Object.entries(data);
      // });
  }
}
