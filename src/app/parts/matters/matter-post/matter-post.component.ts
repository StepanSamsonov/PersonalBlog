import {Component, Input, OnInit} from '@angular/core';
import {AngularFirestore} from "angularfire2/firestore";
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from "rxjs/Observable";
import { MatterListService } from "./matter-post.service";
import {Subject} from "rxjs/Subject";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {links} from '../../../stuff/links';

@Component({
  selector: 'app-matter-post',
  templateUrl: './matter-post.component.html',
  styleUrls: ['./matter-post.component.css'],
})
export class MatterPostComponent implements OnInit {

  matters: any[];
  @Input() refreshform = new Subject();
  loc_form: FormGroup;
  selectBox: string;

  constructor(private db: AngularFireDatabase,
              private MatterListService: MatterListService,
              private fb: FormBuilder) {
    this.selectBox = "Green";
    this.createLocForm();
  }

  ngOnInit() {
    //this.matters = this.db.list('matters').valueChanges();
    this.MatterListService.getMatters().subscribe(data => {
      this.matters = data;
    });
    this.refreshform.subscribe(()=> {
      this.MatterListService.getMatters().subscribe(data => {
      this.matters = data;
      });
    })
  }

  deleteObject(itemKey) {
    this.db.object('matters/' + itemKey ).remove();
    this.MatterListService.getMatters().subscribe(data => {
      this.matters = data;
    });
  }

  createLocForm() {
    this.loc_form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      timeover: ['', Validators.required],
      priority: ['', Validators.required],
    });
  }

  opencloseLocForm(id) {
    for (let i=0; i<this.matters.length; ++i) {
      if (this.matters[i].id == id) {
        this.matters[i].show = !this.matters[i].show;
        if (this.matters[i].show) {
          for (let j=0; j<this.matters.length; ++j) {
            if (i != j) {
              this.matters[j].show = false;
            }
          }
        }
        break;
      }
    }
  }

  changePost(id) {
    this.opencloseLocForm(id);
    let {name, description, timeover, priority} = this.loc_form.value;
    if (name != '') {
      this.db.object('matters/' + id).update({name: name});
    }
    if (description != '') {
      this.db.object('matters/' + id).update({description: description});
    }
    if (timeover != '') {
      this.db.object('matters/' + id).update({timeover: timeover});
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
      this.db.object('matters/' + id).update({priority: priority});
      this.db.object('matters/' + id).update({icon: icon});
    }
    this.MatterListService.getMatters().subscribe(data => {
      this.matters = data;
    });
    this.createLocForm();
  }
}
