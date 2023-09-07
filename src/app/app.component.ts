import { MosqueService } from './mosque-pages/service/mosque.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from './user-pages/service/user.service';
import { Mosque } from './model/mosque.model';
import {TimeService} from "./time-pages/service/time.service";
import {TimeModel} from "./model/time.model";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(private timeService: TimeService) {}
  ngOnInit(): void {
    const time: TimeModel = {
      id: null,
      name: 'Fajr',
      hour: 0,
      minute: 0
    }
    this.timeService.addTime(time);

  }
}
