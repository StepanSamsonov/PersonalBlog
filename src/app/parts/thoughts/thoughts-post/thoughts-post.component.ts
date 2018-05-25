import { AngularFireDatabase } from "angularfire2/database";
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import {Subject} from "rxjs/Subject";
import "rxjs/add/operator/takeUntil";

import { AuthService } from '../../../auth/services/auth.service';
import { VisitsComponent } from '../../../visits/visits.component';
import { ThoughtsListService } from "./thoughts-post.service"


@Component({
  selector: 'app-thoughts-post',
  templateUrl: './thoughts-post.component.html',
  styleUrls: ['./thoughts-post.component.css']
})
export class ThoughtsPostComponent implements OnInit, OnDestroy {

  thoughts: any[];
  pages_count: any;
  current_page: number = 0;
  posts_per_pages: number = 5;
  loc_form: FormGroup;

  private destroyStream = new Subject<void>();

  constructor(private db: AngularFireDatabase,
              private ThoughtsListService: ThoughtsListService,
              private fb: FormBuilder,
              private vs: VisitsComponent,
              private AuthService: AuthService) { }


  ngOnInit() {
    this.createLocForm();
    this.vs.updateVisitData();
    this.updateThoughts();
  }

  isLoggedIn() {
    return this.AuthService.isLoggedIn();
  }

  refreshForm() {
    this.updateThoughts();
  }

  createLocForm() {
    this.loc_form = this.fb.group({
      title: ['', Validators.required],
      text: ['', Validators.required],
    });
  }

  updateThoughts() {
    this.ThoughtsListService.getThoughts()
      .takeUntil(this.destroyStream)
      .subscribe(data => {
      this.thoughts = data.slice(this.current_page*this.posts_per_pages,
        Math.min((this.current_page+1)*this.posts_per_pages, data.length));
        this.pages_count = Math.ceil(data.length/this.posts_per_pages);
    });
  }

  changeFormOpenness(id) {
    ThoughtsListService.changeFormOpenness(id, this.thoughts);
  }

  deletePost(id) {
    this.ThoughtsListService.deletePost(id);
    this.updateThoughts();
  }

  changePost(id) {
    this.changeFormOpenness(id);
    this.ThoughtsListService.updatePost(id, this.loc_form.value);
    this.createLocForm();
    this.updateThoughts();
  }

  changePage(numb) {
    this.current_page = numb;
    this.updateThoughts();
  }

  ngOnDestroy() {
    this.destroyStream.next();
    this.destroyStream.complete();
  }
}
