import { AngularFireDatabase } from 'angularfire2/database';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../../auth/services/auth.service';
import {ThoughtsFormService} from "./thoughts-form.service";


@Component({
  selector: 'app-thoughts-form',
  templateUrl: './thoughts-form.component.html',
  styleUrls: ['./thoughts-form.component.css']
})
export class ThoughtsFormComponent {

  form: FormGroup;
  show = false;
  @Output() refreshForm = new EventEmitter();


  constructor(private fb: FormBuilder,
              private db: AngularFireDatabase,
              private AuthService: AuthService,
              private ThoughtsFormService: ThoughtsFormService) {
    this.createForm();
  }

  isLoggedIn() {
    return this.AuthService.isLoggedIn();
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
    this.ThoughtsFormService.submitForm(this.form.value);
    this.form.reset();
    this.refreshForm.emit();
  }
}
