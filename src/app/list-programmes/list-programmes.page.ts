import { Component, OnInit } from '@angular/core';
import { ProgramService } from 'src/data/programme/programme.service';
import { Programme } from '../model/programme.model';

@Component({
  selector: 'app-list-programmes',
  templateUrl: './list-programmes.page.html',
  styleUrls: ['./list-programmes.page.scss'],
})
export class ListProgrammesPage implements OnInit {
  programmes: Programme[] = [];

  constructor(private programService: ProgramService) { }


  async ngOnInit() {
    await this.programService.getAllPrograms().then(
      (programmes) => programmes.subscribe((a) => {
        this.programmes = a;
      })
    );
    console.log('Programmes:', this.programmes);
  }

}




