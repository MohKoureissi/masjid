import { Component, OnInit } from '@angular/core';
import { ProgramService } from 'src/data/programme/programme.service';
import { Programme } from '../model/programme.model';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-list-programmes',
  templateUrl: './list-programmes.page.html',
  styleUrls: ['./list-programmes.page.scss'],
})
export class ListProgrammesPage implements OnInit {
  programmes: Programme[] = [];

  constructor(private programService: ProgramService, private route: ActivatedRoute) { }


  async ngOnInit() {
    const mosqueId = await this.route.snapshot.params['mosqueId']


    await this.programService.getAllPrograms(mosqueId).then(
      (programmes) => programmes.subscribe((a) => {
        this.programmes = a;
      })
    );
    console.log('Programmes:', this.programmes);
  }

}




