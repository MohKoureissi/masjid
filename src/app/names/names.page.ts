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
        console.log(this.names);
      //console.log(decodeURIComponent(json))
    })
    console.log(this.names)
  }

  async presentModal(name:any) {
   // console.log(name);
    const modal = await this.modalCtrl.create({
      component: NamesDescriptionPage,
      componentProps : {
        sname: name
      },
      breakpoints: [0, 0.3],
      initialBreakpoint: 0.6,
      cssClass: 'custom-modal',
      handle: false
    });
    await modal.present();
  }
}
