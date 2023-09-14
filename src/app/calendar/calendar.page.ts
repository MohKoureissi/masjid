import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {

constructor() {}

ngOnInit() {

}
onSelect(event: Date){
  this.selectedDate= event;
}
selectedDate: Date = new Date(); // Date sélectionnée par défaut
selectedDate1: Date = new Date(1445,2,14);
// selectedDate: Date = new Date();
// selectedDate: Date = new Date();


}

