import {
  Component,
  EventEmitter,
  OnInit,
  OnChanges,
  OnDestroy,
  Input,
  Output
} from '@angular/core';
import { MatterListService } from '../parts/matters/matter-post/matter-post.service';
import { links } from '../stuff/links';
import {Observable} from "rxjs/Rx";


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
  remind_period: number = 20;
  hours_to_remind: number = 12;
  minutes_to_remid: number = 0;
  time_notif: number = 30000;
  second_period_to_update_time: number = 60;

  constructor(private MatterListService: MatterListService) {
    setInterval(() => {
      const now = new Date();
      if (true ||now.getHours() == this.hours_to_remind && now.getMinutes() == this.minutes_to_remid) {
        MatterListService.getMatters().subscribe(data => {
          this.matters = data;
          for (let matter of this.matters) {
            if (matter.diff < this.remind_period && matter.diff != 0) {
              this.create();
              this.closeDelay = this.time_notif;
              this.title = "Внимание!";
              this.body = matter.name + "\nОсталось: " + matter.diff + matter.days;
              if (matter.priority.indexOf('success') != -1) {
                this.icon = links.green_notification_icon;
              }
              if (matter.priority.indexOf('warning') != -1) {
                this.icon = links.yellow_notification_icon;
              }
              if (matter.priority.indexOf('danger') != -1) {
                this.icon = links.red_notification_icon;
              }
              this.show();
            }
          }
        });
      }
    }, 1000*this.second_period_to_update_time);
  }

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
  }

  public ngOnDestroy (): void {
    this.closeAll();
  }

  public ngOnChanges(): void {
  }

}
