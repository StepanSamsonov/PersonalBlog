import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AngularFireDatabase} from "angularfire2/database";
import {VisitsComponent} from '../../visits/visits.component';
import {AuthService} from '../../auth/services/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  change_time_form: FormGroup;
  time: any;
  change_email_form: FormGroup;
  main_email: string;
  push: string;
  chart_data: number[] = [];
  constructor(private fb: FormBuilder,
              private db: AngularFireDatabase,
              private vs: VisitsComponent,
              private AuthService: AuthService) { }

  ngOnInit() {
    this.vs.updateVisitData();
    this.createTimeForm();
    this.createEmailForm();
    this.db.object('const').valueChanges().subscribe(data => {
      this.chart_data = (data as any).chart_data.split(' ').map(Number);
      this.lineChartData = [
        {data: this.chart_data, label: 'Посещаемость'}
        ]
    });
    this.db.object('const').valueChanges().subscribe(data => {
      this.time = (data as any).time;
      this.main_email = (data as any).email;
      this.push = (data as any).push;

      let radios = document.getElementsByName('push_nots');
      for (let i = 0, length = radios.length; i < length; i++) {
        if ((radios[i] as HTMLInputElement).value === this.push)  {
          (radios[i] as HTMLInputElement).checked = true;
        }
      }
    })
  }

  isLoggedIn() {
    return this.AuthService.isLoggedIn();
  }

  createTimeForm() {
    this.change_time_form = this.fb.group({
      time: ['', Validators.required]
    });
  }

  changeTime() {
    let {time} = this.change_time_form.value;
    if (time != '') {
      this.db.object('const').update({time: time});
    }
    this.time = time;
    this.createTimeForm();
  }

  createEmailForm() {
    this.change_email_form = this.fb.group({
      email: ['', Validators.required],
    });
  }

  changeEmail() {
    let {email} = this.change_email_form.value;
    if (email != '') {
      this.db.object('const').update({email: email});
    }
    this.main_email = email;
    this.createEmailForm();
  }

  changePush() {
    let radios = document.getElementsByName('push_nots');
    for (let i = 0, length = radios.length; i < length; i++) {
      if ((radios[i] as HTMLInputElement).checked)  {
        this.push = (radios[i] as HTMLInputElement).value;

        this.db.object('const').update({push: this.push});
      }
    }
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
}
