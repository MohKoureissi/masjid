import { UserService } from 'src/data/user/user.service';
import { Component, OnInit } from '@angular/core';
import { Mosque } from './model/mosque.model';
import {TimeModel} from "./model/time.model";
import {AdminModel} from "./model/admin.model";
import {TimeService} from "../data/time/time.service";
import {AdminService} from "../data/user/admin.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  time: TimeModel|null = null;
  constructor(private timeService: TimeService, private adminService: AdminService , private UserService:UserService) {}
  ngOnInit(): void {
    this.test();
    this.UserService.getUserById("fEUxk5kE21cyL5ZMpwacj1Vvjrh2")
  }

  async test(){

    /*const newTime: TimeModel = {
      hour: 12,
      minute: 30,
      id: "VSgqKmiyyp4CZVKcx3Zn",
      mosqueId: "5wAxEAuQ2uUkwGBBwz6C",
      name: "Asr"
    }*/
    const newAdmin: AdminModel = {
      id: "rD4pNgmArHNTbi2NAsweGaxXO5j1",
      fullName: "Oumou Tankara",
      email: "aicha@gmail.com",
      numTel: "87 98 87 12",
      password: "123456",
      emailCode: "0974_",
      passwordCode: "0866_",
      recupEmail: "oumar@gmail.com"
    }

    //this.time = await this.timeService.getTime("5wAxEAuQ2uUkwGBBwz6C", "VSgqKmiyyp4CZVKcx3Zn");
    //this.time = await this.timeService.getAllTimes("5wAxEAuQ2uUkwGBBwz6C");
    //this.time = await this.timeService.updateTime(newTime)
    //this.timeService.deleteTime("5wAxEAuQ2uUkwGBBwz6C", "VSgqKmiyyp4CZVKcx3Zn")

    //this.adminService.signInAdmin("aicha@gmail.com", "123456");
    //this.adminService.signOutAdmin();
    //this.adminService.signUpAdmin(newAdmin);

    //this.adminService.updateAdmin(newAdmin);
    //console.log(this.time);

  }
}
