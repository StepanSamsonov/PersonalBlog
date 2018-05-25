import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";


@Injectable()
export class ImportantService {

  constructor(private http: HttpClient) { }

  
  getCatalog(current_dir: string): Observable<any[]> {
    return this.http.get('https://dashablog-55ba7.firebaseio.com/' + current_dir + '.json')
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
}
