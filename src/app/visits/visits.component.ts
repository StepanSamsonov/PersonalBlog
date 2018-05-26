import { AngularFireDatabase } from "angularfire2/database";
import { Component } from '@angular/core';

import 'rxjs/add/operator/take';

import { VisitService } from './visits.service';

@Component({
  selector: 'app-visits',
  template: '',
})
export class VisitsComponent {

  constructor(private db: AngularFireDatabase,
              private VisitService: VisitService) { }

  updateVisitData() {
    let subscription = this.VisitService.getConst()
      .subscribe(data => {
        const {now_date, visit_data} = VisitService.calcTime(data);
        this.VisitService.updateConst(now_date, visit_data);
        subscription.unsubscribe();
    });
  }
}
