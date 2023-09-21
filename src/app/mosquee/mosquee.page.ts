import { Component, OnInit } from '@angular/core';
import {MosqueService} from "../../data/mosque/mosque.service";
import {Mosque} from "../model/mosque.model";

@Component({
  selector: 'app-mosquee',
  templateUrl: './mosquee.page.html',
  styleUrls: ['./mosquee.page.scss'],
})
export class MosqueePage implements OnInit {
  mosques: Mosque[]= [];

  constructor(private mosqueService: MosqueService) { }

  ngOnInit() {
    this.mosqueService.getAllMosques().then(value => value.subscribe(v =>{
      this.mosques = v
    }))
  }

}
