import {Component, Input, OnInit} from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";
import {Subject} from "rxjs/Subject";
import {ThinkingsListService} from "./thinkings-post.service"
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-thinkings-post',
  templateUrl: './thinkings-post.component.html',
  styleUrls: ['./thinkings-post.component.css']
})
export class ThinkingsPostComponent implements OnInit {

  thinkings: any[];
  pages_count: any;
  current_page: number = 0;
  @Input() refreshform = new Subject();
  loc_form: FormGroup;

  constructor(private db: AngularFireDatabase,
              private ThinkingsListService: ThinkingsListService,
              private fb: FormBuilder) {
    this.createLocForm();
  }

  ngOnInit() {
    this.pages_count = this.ThinkingsListService.getPagesCount();
    console.log(this.pages_count);
    this.ThinkingsListService.getThinkings(this.current_page).subscribe(data => {
      this.thinkings = data;
    });
    // this.refreshform.subscribe(()=> {
    //   this.ThinkingsListService.getThinkings().subscribe(data => {
    //     this.thinkings = data;
    //   });
    // });

    // for (let i=0; i<this.thinkings.length%5; ++i) {
    //   this.think_buff.push(this.thinkings[i]);
    // }
  }

  deletePost(itemKey) {
    this.db.object('blog/' + itemKey ).remove();
    this.ThinkingsListService.getThinkings(this.current_page).subscribe(data => {
      this.thinkings = data;
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
    this.ThinkingsListService.getThinkings(this.current_page).subscribe(data => {
      this.thinkings = data;
    });
    this.createLocForm();
  }

  changePage(numb) {
    this.current_page = numb;
    this.ThinkingsListService.getThinkings(this.current_page).subscribe(data => {
      this.thinkings = data;
    });
  }
}
