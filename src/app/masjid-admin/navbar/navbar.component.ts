import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone:true,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent  implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {}
alert(){
  this.router.navigate(['/panel'])
  //alert("bonjour tout le monde")
  //console.log("bonJOUR")
}
}
