import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AngularFirestore} from "angularfire2/firestore";
import { AngularFireDatabase } from 'angularfire2/database';
import {links} from "../../../stuff/links";
import {MatterPostComponent} from '../matter-post/matter-post.component'
import {AuthService} from '../../../auth/services/auth.service';


@Component({
  selector: 'app-matter-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  form: FormGroup;
  show = false;
  selectBox: string;
  @Output() refreshForm = new EventEmitter();

  constructor(private fb: FormBuilder,
              private db: AngularFireDatabase,
              private AuthService: AuthService) {
    this.selectBox = "Green";
    this.createForm();
  }

  isLoggedIn() {
    return this.AuthService.isLoggedIn();
  }

  createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      timeover: ['', Validators.required],
      priority: ['', Validators.required],
    });
  }

  toggleShow() {
    this.show = !this.show;
  }

  onSubmit() {
    this.show = false;
    let {name, description, timeover, priority} = this.form.value;
    if (priority === 'Red') {
      priority = 'list-group-item list-group-item-danger';
    } else if (priority === 'Yellow') {
      priority = 'list-group-item list-group-item-warning';
    } else if (priority === 'Green') {
      priority = 'list-group-item list-group-item-success';
    }
    let formRequest = { name, description, timeover, priority };
    this.db.list('matters').push(formRequest);
    this.form.reset();
    this.refreshForm.emit();
  }
}
