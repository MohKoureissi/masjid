import { Component, OnInit } from '@angular/core';
import { DeviceOrientationCompassHeading, DeviceOrientation } from '@ionic-native/device-orientation';

@Component({
  selector: 'app-quibla',
  templateUrl: './quibla.page.html',
  styleUrls: ['./quibla.page.scss'],
})
export class QuiblaPage implements OnInit {
  data: DeviceOrientationCompassHeading | undefined;
  constructor() { 
  }

  ngOnInit() {
  }
}
