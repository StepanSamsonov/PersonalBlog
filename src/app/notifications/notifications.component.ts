import {
  Component,
  EventEmitter,
  OnInit,
  OnChanges,
  OnDestroy,
  Input,
  Output
} from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";

import { MatterListService } from '../parts/matters/matter-post/matter-post.service';
import { links } from '../stuff/links';


declare var Notification;

@Component({
  selector: 'app-notification',
  styles: [':host { display: none; }'],
  template: ''
})
export class NotificationsComponent implements OnInit, OnChanges, OnDestroy {

  @Input() public title: string;
  @Input() public body: string;
  @Input() public icon: string;
  @Input() public sound: string;
  @Input() public data: any;
  @Input() public tag: string;
  @Input() public dir: string = 'auto';
  @Input() public lang: string = 'en-US';
  @Input() public renotify: boolean = false;
  @Input() public sticky: boolean = false;
  @Input() public vibrate: Array<number>;
  @Input() public noscreen: boolean = false;
  @Input() public silent: boolean = true;
  @Input() public closeDelay: number = 0;

  @Output('load') public onLoad: EventEmitter<any> = new EventEmitter();
  @Output('show') public onShow: EventEmitter<any> = new EventEmitter();
  @Output('close') public onClose: EventEmitter<any> = new EventEmitter();
  @Output('error') public onError: EventEmitter<any> = new EventEmitter();
  @Output('action') public onClick: EventEmitter<any> = new EventEmitter();


  private instances: Notification[] = [];
  matters: any[];
  remind_period: number = 5;
  hours_to_remind: number = 12;
  minutes_to_remid: number = 0;
  time_notif: number = 2000;
  second_period_to_update_time: number = 60;
  use_notific: boolean = false;

  constructor(private MatterListService: MatterListService,
              private db: AngularFireDatabase) { }


  public checkCompatibility () {
    return !!('Notification' in window);
  }


  public isPermissionGranted (permission) {
    return permission === 'granted';
  }


  public requestPermission (callback) {
    return Notification.requestPermission(callback);
  }


  public show () {
    if (!this.checkCompatibility()) {
      return console.log('Notification API not available in this browser.');
    }

    return this.requestPermission((permission) => {
      if (this.isPermissionGranted(permission)) {
        this.create();
      }
    });
  }


  public create () {
    if (this.title === undefined) {
      return 0;
    }
    let notification = new Notification(this.title, {
      dir: this.dir,
      lang: this.lang,
      data: this.data,
      tag: this.tag,
      body: this.body,
      icon: this.icon,
      silent: this.silent,
      sound: this.sound,
      renotify: this.renotify,
      sticky: this.sticky,
      vibrate: this.vibrate,
      noscreen: this.noscreen
    });

    this.instances.push(notification);
    this.attachEventHandlers(notification);
    this.close(notification);

    return notification;
  }


  public close (notification): void {
    if (this.closeDelay) {
      setTimeout(() => {
        notification.close();
      }, this.closeDelay);
    } else {
      notification.close();
    }
  }


  public closeAll (): void {
    this.instances.map(notification => this.close(notification));
    this.instances = [];
  }


  attachEventHandlers (notification): void {
    notification.onshow = () => {
      this.onShow.emit({ notification });
    };

    notification.onclick = (event) => {
      this.onClick.emit({ event, notification });
    };

    notification.onerror = () => {
      this.onError.emit({ notification });
    };

    notification.onclose = () => {
      this.onClose.emit({ notification });
    };
  }


  public ngOnInit (): void {
    this.onLoad.emit({});

    setInterval(() => {
      let into = true;
      this.db.object('/').valueChanges().subscribe(data => {
        if (into) {
          const time = (data as any).const.time.split(':');
          this.hours_to_remind = parseInt(time[0]);
          this.minutes_to_remid = parseInt(time[1]);
          this.use_notific = (data as any).const.push === 'true';
          const now = new Date();

          if (this.hours_to_remind === now.getHours() && this.minutes_to_remid === now.getMinutes()
            && this.use_notific) {

            let matters = (data as any).matters;
            let not_data = [];
            for (let id in matters) {
              let {description, icon, name, priority, timeover} = matters[id];
              const now = new Date().getTime();
              const end = new Date(timeover).getTime();
              let diff = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
              let days = '';
              if (diff % 10 == 1) {
                days = ' день';
              } else if (diff % 10 == 2 || diff % 10 == 3 || diff % 10 == 4) {
                days = ' дня';
              } else {
                days = ' дней';
              }
              if (diff < this.remind_period && diff > 0) {
                const closeDelay = this.time_notif;
                const title = "Внимание!";
                const body = name + "\nОсталось: " + diff + days;
                let icon = '';
                if (priority.indexOf('success') != -1) {
                  icon = links.green_notification_icon;
                }
                if (priority.indexOf('warning') != -1) {
                  icon = links.yellow_notification_icon;
                }
                if (priority.indexOf('danger') != -1) {
                  icon = links.red_notification_icon;
                }
                not_data.push({closeDelay: closeDelay, title: title, body: body, icon: icon});
              }
            }

            if (not_data) {
              let i = 0;

              let interval = setInterval(() => {
                this.closeAll();
                let elem = not_data[i];
                this.title = elem.title;
                this.body = elem.body;
                this.closeDelay = elem.closeDelay;
                this.icon = elem.icon;
                this.create();
                i += 1;
                if (not_data.length === i) {
                  clearInterval(interval);
                }
              }, 4000);
              this.closeAll();
            }
          }
        }
        into = false;
      });
    }, 1000*this.second_period_to_update_time);
  }


  public ngOnDestroy (): void {
    this.closeAll();
    }


  public ngOnChanges(): void {
  }
}
