import {Component, Input, OnInit} from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";
import {Subject} from "rxjs/Subject";
import {ThinkingsListService} from "./thinkings-post.service"
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {VisitsComponent} from '../../../visits/visits.component';

@Component({
  selector: 'app-thinkings-post',
  templateUrl: './thinkings-post.component.html',
  styleUrls: ['./thinkings-post.component.css']
})
export class ThinkingsPostComponent implements OnInit {

  thinkings: any[];
  pages_count: any;
  current_page: number = 0;
  posts_per_pages: number = 5;
  loc_form: FormGroup;

  constructor(private db: AngularFireDatabase,
              private ThinkingsListService: ThinkingsListService,
              private fb: FormBuilder,
              private vs: VisitsComponent) {
    this.createLocForm();
  }

  ngOnInit() {
    this.vs.updateVisitData();
    this.ThinkingsListService.getThinkings().subscribe(data => {
      this.thinkings = data.slice(0, Math.min(this.posts_per_pages, data.length));
      this.pages_count = Math.floor(data.length/this.posts_per_pages)+1;
    });
  }

  refreshForm() {
    this.ThinkingsListService.getThinkings().subscribe(data => {
      this.thinkings = data.slice(0, Math.min(this.posts_per_pages, data.length));
      this.pages_count = Math.floor(data.length/this.posts_per_pages)+1;
    });
  }

  deletePost(itemKey) {
    this.db.object('blog/' + itemKey ).remove();
    this.ThinkingsListService.getThinkings().subscribe(data => {
      this.thinkings = data.slice(this.current_page*this.posts_per_pages,
        Math.min((this.current_page+1)*this.posts_per_pages, data.length));
    });
  }

  createLocForm() {
    this.loc_form = this.fb.group({
      title: ['', Validators.required],
      text: ['', Validators.required],
    });
  }

  opencloseLocForm(id) {
    for (let i=0; i<this.thinkings.length; ++i) {
      if (this.thinkings[i].id == id) {
        this.thinkings[i].show = !this.thinkings[i].show;
        if (this.thinkings[i].show) {
          for (let j=0; j<this.thinkings.length; ++j) {
            if (i != j) {
              this.thinkings[j].show = false;
            }
          }
        }
        break;
      }
    }
  }

  changePost(id) {
    this.opencloseLocForm(id);
    let {title, text} = this.loc_form.value;
    if (title != '') {
      this.db.object('blog/' + id).update({title: title});
    }
    if (text != '') {
      this.db.object('blog/' + id).update({text: text});
    }
    this.ThinkingsListService.getThinkings().subscribe(data => {
      this.thinkings = data.slice(this.current_page*this.posts_per_pages,
        Math.min((this.current_page+1)*this.posts_per_pages, data.length));
    });
    this.createLocForm();
  }

  changePage(numb) {
    this.current_page = numb;
    this.ThinkingsListService.getThinkings().subscribe(data => {
      this.thinkings = data.slice(this.current_page*this.posts_per_pages,
        Math.min((this.current_page+1)*this.posts_per_pages, data.length));
    });
  }
}
