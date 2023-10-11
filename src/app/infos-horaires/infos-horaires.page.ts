import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Mosque} from "../model/mosque.model";
import {MosqueService} from "../../data/mosque/mosque.service";
import {TimeModel} from "../model/time.model";
import {TimeService} from "../../data/time/time.service";

@Component({
  selector: 'app-infos-horaires',
  templateUrl: './infos-horaires.page.html',
  styleUrls: ['./infos-horaires.page.scss'],
})
export class InfosHorairesPage implements OnInit {
  mosque: Mosque|null = null;
  imageUrl: String = "";
  constructor(private route: ActivatedRoute, private mosqueService: MosqueService) { }

  async ngOnInit() {
    const id = this.route.snapshot.params['id'];

    if(id){
      await this.mosqueService.getDetailsMosque(id).then(mosque => mosque.subscribe(v=>{
        this.mosque=v;
      }));
      this.imageUrl = this.mosque?.imageUrl!
      console.log(this.mosque?.imageUrl)
    }
  }

}
