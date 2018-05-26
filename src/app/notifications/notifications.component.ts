import {
  Component,
  EventEmitter,
  OnInit,
  OnChanges,
  OnDestroy,
  Input,
  Output
} from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";

import { MatterListService } from '../parts/matters/matter-post/matter-post.service';
import { NotificationsService } from "./notifications.service";


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
  second_period_to_update_time: number = 60;

  constructor(private MatterListService: MatterListService,
              private db: AngularFireDatabase,
              private NotificationsService: NotificationsService) { }


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
      this.NotificationsService.getRoot()
        .subscribe(data => {
          if (into) {
            let notify_data = NotificationsService.prepareData(data);

            if (notify_data.length) {
              let i = 0;
              let interval = setInterval(() => {
                this.closeAll();
                let elem = notify_data[i];
                this.title = elem.title;
                this.body = elem.body;
                this.closeDelay = elem.closeDelay;
                this.icon = elem.icon;
                this.create();
                i += 1;
                if (notify_data.length === i) {
                  clearInterval(interval);
                }
              }, 4000);
              this.closeAll();
            }
          }
      into = false;
      });
    }, 1000*this.second_period_to_update_time);
  }

  public ngOnDestroy (): void {
    this.closeAll();}

  public ngOnChanges(): void { }
}
