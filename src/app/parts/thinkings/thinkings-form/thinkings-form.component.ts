import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AngularFirestore} from "angularfire2/firestore";
import { AngularFireDatabase } from 'angularfire2/database';


@Component({
  selector: 'app-thinkings-form',
  templateUrl: './thinkings-form.component.html',
  styleUrls: ['./thinkings-form.component.css']
})
export class ThinkingsFormComponent {

  form: FormGroup;
  show = false;
  @Output() refreshform = new EventEmitter();

  // @Output() get refreshform() {
  //   return this._refreshform.asObservable();
  // }

  constructor(private fb: FormBuilder, private db: AngularFireDatabase) {
    this.createForm();
  }


  createForm() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      text: ['', Validators.required],
    });
  }

  toggleShow() {
    this.show = !this.show;
  }

  onSubmit() {
    this.show = false;
    let {title, text} = this.form.value;
    const time = new Date();
    const date = time.getDate() + "/" + (time.getMonth()+1) + "/" + time.getFullYear();
    let formRequest = { title, text, date};
    this.db.list('blog').push(formRequest);
    this.refreshform.emit();
    this.form.reset();
  }
}
