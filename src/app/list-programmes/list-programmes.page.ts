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

  constructor(private route: ActivatedRoute, private programService: ProgramService) { }


  async ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if(id){
      await this.programService.getAllPrograms(id).then(
        (programmes) => programmes.subscribe((a) => {
          this.programmes = a;
        })
      );
    }
    console.log('Programmes:', this.programmes);
  }

}




