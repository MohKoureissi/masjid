import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MosqueService} from "../../data/mosque/mosque.service";
import {Mosque} from "../model/mosque.model";

@Component({
  selector: 'app-mosquee-details',
  templateUrl: './mosquee-details.page.html',
  styleUrls: ['./mosquee-details.page.scss'],
})
export class MosqueeDetailsPage implements OnInit {
  mosque: Mosque|null = null;

  constructor(private activatedRoute: ActivatedRoute, private mosqueService: MosqueService) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];
    if(id){
      this.mosqueService.getDetailsMosque(id).then(mosque => mosque.subscribe(v=>{
        this.mosque=v;
      }));
    }
  }

}
