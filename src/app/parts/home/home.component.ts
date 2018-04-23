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
  change_email_form: FormGroup;
  main_email: string;

  constructor(private fb: FormBuilder,
              private db: AngularFireDatabase) { }

  ngOnInit() {
    this.createTimeForm();
    this.createEmailForm();
    this.db.object('const').valueChanges().subscribe(data => {
      this.time_hours = (data as any).hours;
      this.time_mins = (data as any).mins;
      this.main_email = (data as any).email;
    })
  }

  createTimeForm() {
    this.change_time_form = this.fb.group({
      mins: ['', Validators.required],
      hours: ['', Validators.required],
    });
  }

  createEmailForm() {
    this.change_email_form = this.fb.group({
      email: ['', Validators.required],
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
