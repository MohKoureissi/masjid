import { Component, OnInit } from '@angular/core';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';

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


}

