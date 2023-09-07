import { MosqueService } from './mosque-pages/service/mosque.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from './user-pages/service/user.service';
import { Mosque } from './model/mosque.model';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(private MosqueService:MosqueService, private UserService:UserService) {}
  ngOnInit(): void {
    const mosque: Mosque = {
      id:"njs",
      name: 'Nom de la mosquée',
      imanName: 'Nom de l\'iman',
      description: 'Description de la mosquée',
      donation: 'Informations sur les dons',
      location: 'Emplacement de la mosquée',
      quartier: 'Quartier de la mosquée',
    };
    this.UserService.subscribeToMosque("",mosque)
   this.UserService.loginUser('ayaya6436@gmail.com','0987654')
  //  this.userService.loginUser('ayaya6436@gmail.com','0987654');
  //  this.userService.logoutUser();
  // this.userService.forgotPassword('ayaya6436@gmail.com');

  }
}
