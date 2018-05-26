import { AngularFireDatabase } from "angularfire2/database";
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import {Subject} from "rxjs/Subject";
import "rxjs/add/operator/takeUntil";

import { AuthService } from '../../auth/services/auth.service';
import { ImportantService } from './important.service';
import { VisitsComponent } from '../../visits/visits.component';


@Component({
  selector: 'app-important',
  templateUrl: './important.component.html',
  styleUrls: ['./important.component.css']
})
export class ImportantComponent implements OnInit, OnDestroy {

  current_dir: string = 'Home';
  available_catalogs: any[] = [];
  available_files: any[] = [];

  content: any[] = [];
  content_title: string = '';
  content_id: string = 'content id';
  content_id_before: string = 'content id before';
  show_content: boolean = true;
  special_counter: number = 0;

  create_form: FormGroup;
  show_create_form: boolean = false;
  selectBox: string = 'file';

  change_file_form: FormGroup;
  show_change_content_form: boolean = false;
  content_sub: any;
  change_butt_disabled: boolean = false;

  private destroyStream = new Subject<void>();

  constructor(private ImportantService: ImportantService,
              private db: AngularFireDatabase,
              private fb: FormBuilder,
              private vs: VisitsComponent,
              private AuthService: AuthService) { }

  ngOnInit() {
    this.vs.updateVisitData();
    this.setChangeFileButton(true);
    this.getDir();
    this.createForm();
  }

  isLoggedIn() {
    return this.AuthService.isLoggedIn();
  }

  createElement() {
    this.ImportantService.createElement(this.create_form.value, this.current_dir);
    this.createForm();
    this.show_create_form = false;
    this.getDir();
  }

  createForm() {
    this.create_form = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
    });
  }

  delDir(id, name) {
    this.ImportantService.delDir(this.current_dir, id, name);
    this.getDir();
  }

  delFile(id) {
    this.ImportantService.delFile(this.current_dir, id);
    this.getDir();
  }

  changeDir(new_path: string) {
    this.current_dir += '/' + new_path;
    this.getDir();
  }

  returnDir(name: string) {
    let way = this.getWay();
    this.current_dir = way.slice(0, way.indexOf(name)+1).join('/');
    this.getDir();
  }

  getDir() {
    this.ImportantService.getCatalog(this.current_dir)
      .takeUntil(this.destroyStream)
      .subscribe(data => {
        this.available_catalogs = data.filter(elem => elem.type === 'catalog');
        this.available_files = data.filter(elem => elem.type === 'file');
    });
  }

  getWay() {
    return this.current_dir.split('/');
  }

  changeCreateFormOpenness() {
    this.show_create_form = !this.show_create_form;
  }

  setChangeFileButton(value: boolean) {
    this.change_butt_disabled = value;
  }

  changeFileOpenness(id) {
    this.content_sub = this.ImportantService.getFile(this.current_dir, id)
      .takeUntil(this.destroyStream)
      .subscribe(data => {
        const {content_title, content_id, content_id_before,
          content, special_counter} = ImportantService.openFile(data, id, this.special_counter, this.content_id);
        this.content_title = content_title;
        this.content_id = content_id;
        this.content_id_before = content_id_before;
        this.content = content;
        this.special_counter = special_counter;
      });
  }

  changeFileFormOpenness() {
    this.show_content = !this.show_content;
    this.show_change_content_form = !this.show_change_content_form;
    if (this.show_change_content_form) {
      this.change_file_form = this.fb.group({
        name: ['', Validators.required],
        text: ['', Validators.required],
      });
    }
  }

  changeFile() {
    this.show_content = true;
    this.show_change_content_form = false;
    this.ImportantService.changeFile(this.change_file_form.value, this.current_dir, this.content_id);
    const {name, text} = this.change_file_form.value;
    this.content_title = name ? name : this.content_title;
    this.content = text ? text.split('\n') : this.content;
    this.change_file_form.reset();
    this.getDir();
  }

  ngOnDestroy() {
    this.destroyStream.next();
    this.destroyStream.complete();
  }
}
