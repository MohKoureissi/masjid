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
selectedDate: Date | null = null;
dateSelectedg(date: Date | null): void {
  if (date !== null) {
    this.selectedDate = date;
    console.log('Date sélectionnée : ', date);
  } else {
    // L'utilisateur a désélectionné la date, vous pouvez choisir de traiter cela comme vous le souhaitez
    console.log('Date désélectionnée');
  }
}

// Fonction pour définir les classes des cellules du calendrier
dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
  // Personnalisez cette fonction pour appliquer des classes CSS aux cellules du calendrier selon vos besoins
  return '';
};

// Fonction appelée lors de la sélection d'une date
dateSelected(date: Date): void {
  this.selectedDate = date;
  console.log('Date sélectionnée : ', date);
}

}

