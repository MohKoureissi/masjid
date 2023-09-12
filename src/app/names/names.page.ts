import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NamesDescriptionPage } from '../names-description/names-description.page';

@Component({
  selector: 'app-names',
  templateUrl: './names.page.html',
  styleUrls: ['./names.page.scss'],
})
export class NamesPage implements OnInit {
  names:any;
  constructor(private modalCtrl: ModalController) { }


  ngOnInit() {
    fetch('./assets/names/99_Names_Of_Allah.json').then(res => res.json()).then(json =>{
        this.names = json.data;
      console.log(json);
    })
    console.log(this.names)
  }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: NamesDescriptionPage,
      breakpoints: [0, 0.3],
      initialBreakpoint: 0.3,
      cssClass: 'custom-modal',
      handle: false
    });
    await modal.present();
  }
}
