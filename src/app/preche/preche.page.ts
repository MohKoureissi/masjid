import { Component, OnInit } from '@angular/core';
import {PrecheurService} from "../../data/precheur/precheur.service";
import {PrecheurModel} from "../model/precheur.model";

@Component({
  selector: 'app-preche',
  templateUrl: './preche.page.html',
  styleUrls: ['./preche.page.scss'],
})
export class PrechePage implements OnInit {

  precheurs:  PrecheurModel[]= [];
  constructor(private precheurService: PrecheurService) { }

  ngOnInit() {
    this.precheurService.getAllPrecheurs().then(
      precheurs => precheurs.subscribe(p =>{
        this.precheurs = p;
        console.log(this.precheurs)
      }))
  }

}
