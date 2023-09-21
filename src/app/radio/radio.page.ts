import { Component, OnInit } from '@angular/core';
import {RadioService} from "../../data/radio/radio.service";
import {RadioModel} from "../model/radio.model";

@Component({
  selector: 'app-radio',
  templateUrl: './radio.page.html',
  styleUrls: ['./radio.page.scss'],
})
export class RadioPage implements OnInit {
  radios: RadioModel[] = [];
  constructor(private radioService: RadioService) { }

  ngOnInit() {
    this.radioService.getAllRadios().then(radios =>radios.subscribe(r =>{
      this.radios = r;
    }))
  }

}
