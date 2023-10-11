import { Component, OnInit } from '@angular/core';
import { ProgramService } from 'src/data/programme/programme.service';
import { Programme } from '../model/programme.model';
import {ActivatedRoute} from "@angular/router";
import {Mosque} from "../model/mosque.model";
import {MosqueService} from "../../data/mosque/mosque.service";

@Component({
  selector: 'app-list-programmes',
  templateUrl: './list-programmes.page.html',
  styleUrls: ['./list-programmes.page.scss'],
})
export class ListProgrammesPage implements OnInit {
  programmes: Programme[] = [];
  mosque!: Mosque|null;

  constructor(private programService: ProgramService, private route: ActivatedRoute, private mosqueService: MosqueService) { }


  async ngOnInit() {
    const mosqueId = await this.route.snapshot.params['mosqueId']
    await this.mosqueService.getDetailsMosque(mosqueId).then(mosque => mosque.subscribe(m => {
      this.mosque = m;
    }))

    await this.programService.getAllPrograms(mosqueId).then(
      (programmes) => programmes.subscribe((a) => {
        this.programmes = a;
      })
    );
    console.log('Programmes:', this.programmes);
  }

}




