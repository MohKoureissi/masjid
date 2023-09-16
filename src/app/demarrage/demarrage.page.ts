import { Component, OnInit } from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { Router } from '@angular/router';
@Component({
  selector: 'app-demarrage',
  templateUrl: './demarrage.page.html',
  styleUrls: ['./demarrage.page.scss'],
})
export class DemarragePage implements OnInit {

  constructor(private router: Router) { }

  async ngOnInit() {
   

    await SplashScreen.show({ showDuration: 2000, autoHide: true, });

    console.log(SplashScreen)
    this.router.navigate(['/connexion']);
  }
}
