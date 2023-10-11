import { Component, OnInit } from '@angular/core';
import {PreacheModel} from "../model/preache.model";
import {ActivatedRoute} from "@angular/router";
import {PreachService} from "../../data/preach/preach.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-list-preche',
  templateUrl: './list-preche.page.html',
  styleUrls: ['./list-preche.page.scss'],
})
export class ListPrechePage implements OnInit {

  preaches: PreacheModel[] = [];
  imageUrl: string = "";
  constructor(private route: ActivatedRoute, private preachService: PreachService, private http: HttpClient) { }

  async ngOnInit() {
    const id = this.route.snapshot.params['id'];


    this.route.queryParams.subscribe(params => {
      this.imageUrl = params['imageUrl'];
    });


    console.log(this.imageUrl);
    await this.preachService.getAllPreaches(id).then(preaches => preaches.subscribe(p => {
      this.preaches = p;
    }))
  }

}
