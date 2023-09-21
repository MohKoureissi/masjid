import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-names-description',
  templateUrl: './names-description.page.html',
  styleUrls: ['./names-description.page.scss'],
})
export class NamesDescriptionPage implements OnInit {
  sname:any;
  constructor() {}

  ngOnInit() {
    
   // console.log(decodeURIComponent(this.sname.fr.desc));
  }

  utf8decode(text:string):string{
    return decodeURIComponent(text).replace(/\\u(\w{4})/g,"é");
  }
  
}

