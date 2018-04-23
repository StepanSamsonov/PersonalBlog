import { Component, OnInit } from '@angular/core';
import {links} from "../../stuff/links";
import {HttpClient} from "@angular/common/http";
import {ImportantService} from './important.service';
import {AngularFireDatabase} from "angularfire2/database";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-important',
  templateUrl: './important.component.html',
  styleUrls: ['./important.component.css']
})
export class ImportantComponent implements OnInit {

  current_dir: string = 'Home';
  availabel_catalogs: any[] = [];
  availabel_files: any[] = [];
  content: any[] = [];
  content_title: string = '';
  content_id: string = '!';
  content_id_before: string = '!!!';
  special_counter: number = 0;
  dir_form: FormGroup;
  selectBox: string = 'file';
  show_create_form: boolean = false;
  show_content: boolean = true;
  show_change_content_form: boolean = false;
  change_file_form: FormGroup;
  content_sub: any;

  constructor(private ImportantService: ImportantService,
              private db: AngularFireDatabase,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.setChangeFileButton(true);
    this.getDir();
    this.createDirForm();
  }

  createFile() {
    let {name, type} = this.dir_form.value;
    if (type === 'catalog') {
      this.db.list(this.current_dir).push({name: name, type: type});
    }
    if (type === 'file') {
      this.db.list(this.current_dir).push({name: name, type: type, text: ''});
    }
    this.createDirForm();
    this.show_create_form = false;
    this.getDir();
  }

  createDirForm() {
    this.dir_form = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
    });
  }

  delDir(id, name) {
    this.db.object(this.current_dir + '/' + id).remove();
    this.db.object(this.current_dir + '/' + name).remove();
    this.getDir();
  }

  delFile(id) {
    if (id === this.content_id) {
      this.content_sub.unsubscribe();
      // this.content = [];
      // this.content_title = '';
      // this.content_id = '';
    }
    this.db.object(this.current_dir + '/' + id).remove();
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
    const files = this.ImportantService.getCatalog(this.current_dir);
    files.subscribe(data => {
      this.availabel_catalogs = data.filter(elem => elem.type === 'catalog');
      this.availabel_files = data.filter(elem => elem.type === 'file');
    });
  }

  getWay() {
    return this.current_dir.split('/');
  }

  showcloseForm() {
    this.show_create_form = !this.show_create_form;
  }

  setChangeFileButton(value: boolean) {
    document.getElementById("change-file-button").disabled = value;
  }

  openFile(id) {
    this.content_sub = this.db.object(this.current_dir + '/' + id).valueChanges().subscribe(
      data => {
        try {
          this.content_title = data.name;

          if (id === this.content_id) {
            this.special_counter += 1;
          } else {
            this.special_counter = 0;
          }
          if (this.special_counter % 2 === 1) {
            this.content = [];
          } else {
            this.content = data.text.split('\n');
          }
          this.content_id_before = this.content_id;
          this.content_id = id;
        }
    });
  }

  changeFile(id) {
    this.show_content = !this.show_content;
    this.show_change_content_form = !this.show_change_content_form ;
    if (this.show_change_content_form) {
      this.change_file_form = this.fb.group({
        name: ['', Validators.required],
        text: ['', Validators.required],
      });
    }
  }

  changeFileSubmit() {
    this.show_content = true;
    this.show_change_content_form = false;
    let {name, text} = this.change_file_form.value;
    if (name != '') {
      this.db.object(this.current_dir + '/' + this.content_id).update({name: name});
    }
    if (text != '') {
      this.db.object(this.current_dir + '/' + this.content_id).update({text: text});
    }
    this.change_file_form.reset();
    this.getDir();
  }
}
