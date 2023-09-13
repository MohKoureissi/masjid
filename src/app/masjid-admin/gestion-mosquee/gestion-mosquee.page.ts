import { Component, OnInit } from '@angular/core';
import { modelmosquee } from '../Model/modelmosquee';
@Component({
  selector: 'app-gestion-mosquee',
  templateUrl: './gestion-mosquee.page.html',
  styleUrls: ['./gestion-mosquee.page.scss'],
})
export class GestionMosqueePage implements OnInit {

  constructor() { }
  mosqueedata!:modelmosquee[];

  ngOnInit() {
  }
  displaycolums: string[]=["id","nommosquee", "nomimam", "numdon", "quartier","isactive", "action"]
}
