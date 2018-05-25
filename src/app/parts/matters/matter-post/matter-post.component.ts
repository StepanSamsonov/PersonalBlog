import { AngularFireDatabase } from 'angularfire2/database';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatterListService } from "./matter-post.service";

import { Subject } from "rxjs/Subject";
import "rxjs/add/operator/takeUntil";

import { AuthService } from '../../../auth/services/auth.service';
import { VisitsComponent } from '../../../visits/visits.component';


@Component({
  selector: 'app-matter-post',
  templateUrl: './matter-post.component.html',
  styleUrls: ['./matter-post.component.css'],
})
export class MatterPostComponent implements OnInit, OnDestroy {

  matters: any[];
  loc_form: FormGroup;
  selectBox: string;

  private destroyStream = new Subject<void>();

  constructor(private db: AngularFireDatabase,
              private MatterListService: MatterListService,
              private fb: FormBuilder,
              private vs: VisitsComponent,
              private AuthService: AuthService) { }

  ngOnInit() {
    this.selectBox = "Green";

    this.createLocForm();
    this.vs.updateVisitData();
    this.updateMatterList();
  }

  isLoggedIn() {
    return this.AuthService.isLoggedIn();
  }

  updateMatterList() {
    this.MatterListService.getMatters()
      .takeUntil(this.destroyStream)
      .subscribe(data => {
      this.matters = data;
    });
  }

  refreshForm() {
    this.updateMatterList();
  }

  deleteForm(id) {
    this.MatterListService.deleteForm(id);
    this.updateMatterList();
  }

  createLocForm() {
    this.loc_form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      deadline: ['', Validators.required],
      priority: ['', Validators.required],
    });
  }

  changeFormOpenness(id) {
    MatterListService.changeFormOpenness(id, this.matters)
  }

  changePostData(id) {
    this.changeFormOpenness(id);
    this.MatterListService.updatePostData(id, this.loc_form.value);
    this.updateMatterList();
    this.createLocForm();
  }

  ngOnDestroy() {
    this.destroyStream.next();
    this.destroyStream.complete();
  }
}
