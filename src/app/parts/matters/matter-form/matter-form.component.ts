import { AngularFireDatabase } from 'angularfire2/database';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../../auth/services/auth.service';
import { MatterFormService } from "./matter-form.service";


@Component({
  selector: 'app-matter-form',
  templateUrl: './matter-form.component.html',
  styleUrls: ['./matter-form.component.css']
})
export class FormComponent implements OnInit {

  form: FormGroup;
  show = false;
  selectBox: string;
  @Output() refreshForm = new EventEmitter();


  constructor(private fb: FormBuilder,
              private db: AngularFireDatabase,
              private AuthService: AuthService,
              private MatterFormService: MatterFormService) { }

  ngOnInit() {
    this.createForm();
  }

  isLoggedIn() {
    return this.AuthService.isLoggedIn();
  }

  createForm() {
    this.selectBox = "Green";
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      deadline: ['', Validators.required],
      priority: ['', Validators.required],
    });
  }

  toggleShow() {
    this.show = !this.show;
  }

  onSubmit() {
    this.show = false;
    this.MatterFormService.submitForm(this.form.value);
    this.form.reset();
    this.selectBox = "Green";
    this.refreshForm.emit();
  }
}
