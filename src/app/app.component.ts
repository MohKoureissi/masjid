import { Component, OnInit } from '@angular/core';
import { UserService } from './user-pages/service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private userService:UserService) {}
  ngOnInit(): void {
    this.userService.register('ayaya','78328738','ayaya6436@gmail.com','123456',[],[]);
  }
}
