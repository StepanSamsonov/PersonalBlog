import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AngularFireDatabase} from "angularfire2/database";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  change_time_form: FormGroup;
  time_mins: string;
  time_hours: string;

  constructor(private fb: FormBuilder,
              private db: AngularFireDatabase) { }

  ngOnInit() {
    this.createTimeForm();
    this.db.list('const/time').push({mins: 0, hours: 12});
    let data = this.db.object('const/time').valueChanges();
    console.log(data);
  }

  createTimeForm() {
    this.change_time_form = this.fb.group({
      mins: ['', Validators.required],
      hours: ['', Validators.required],
    });
  }

  changeTime() {
    let {mins, hours} = this.change_time_form.value;
    if (mins != '') {
      this.db.object('const/time').update({mins: mins});
    }
    if (hours != '') {
      this.db.object('const/time').update({hours: hours});
    }
  }

}
