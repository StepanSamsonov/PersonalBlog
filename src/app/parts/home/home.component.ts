import { AngularFireDatabase } from "angularfire2/database";
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Subject } from "rxjs/Subject";
import "rxjs/add/operator/takeUntil";

import { AuthService } from '../../auth/services/auth.service';
import { VisitsComponent } from '../../visits/visits.component';
import { MainService } from './home.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  change_time_form: FormGroup;
  time: any;
  change_email_form: FormGroup;
  main_email: string;
  push: string;
  chart_data: number[] = [];
  show_mess: boolean = false;

  private destroyStream = new Subject<void>();

  constructor(private fb: FormBuilder,
              private db: AngularFireDatabase,
              private vs: VisitsComponent,
              private AuthService: AuthService,
              private MainService: MainService) { }

  ngOnInit() {
    this.vs.updateVisitData();
    this.createTimeForm();
    this.createEmailForm();
    this.MainService.getConst()
      .takeUntil(this.destroyStream)
      .subscribe(data => {
      this.chart_data = (data as any).chart_data.split(' ').map(Number);
      this.lineChartData = [ {data: this.chart_data, label: 'Посещаемость'} ];

      this.time = (data as any).time;
      this.main_email = (data as any).email;
      this.push = (data as any).push;
      MainService.setInitialRadio(this.push);
    });
  }

  isLoggedIn() {
    return this.AuthService.isLoggedIn();
  }

  showMess() {
    this.show_mess = true;
    let interval = setTimeout(() => {
      this.show_mess = false;
      clearInterval(interval);
    }, 2000);
  }

  createTimeForm() {
    this.change_time_form = this.fb.group({
      time: ['', Validators.required]
    });
  }

  changeTime() {
    let {time} = this.change_time_form.value;
    this.MainService.changeTime(time);
    this.time = time;
    this.createTimeForm();
    this.showMess();
  }

  createEmailForm() {
    this.change_email_form = this.fb.group({
      email: ['', Validators.required],
    });
  }

  changeEmail() {
    let {email} = this.change_email_form.value;
    this.MainService.changeEmail(email);
    this.main_email = email;
    this.createEmailForm();
    this.showMess();
  }

  changePush() {
    let radios = document.getElementsByName('push_notifications');
    this.push = this.MainService.updatePush(radios);
    this.showMess();
  }

  public lineChartData:Array<any> = [
    {data: this.chart_data, label: 'Посещаемость'},
  ];
  public lineChartLabels:Array<any> = ['14','13','12','11','10','9','8',
                                        '7','6', '5', '4', '3', '2', '1', '0'];
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
    {
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';
  public chartClicked(e:any):void { }
  public chartHovered(e:any):void { }

  ngOnDestroy() {
    this.destroyStream.next();
    this.destroyStream.complete();
  }
}
