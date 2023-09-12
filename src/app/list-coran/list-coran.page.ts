import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {RecitationService} from "../../data/recitation/recitation.service";
import {RecitationModel} from "../model/recitation.model";

@Component({
  selector: 'app-list-coran',
  templateUrl: './list-coran.page.html',
  styleUrls: ['./list-coran.page.scss'],
})
export class ListCoranPage implements OnInit {
  recitations: RecitationModel[] = [];
  constructor(private route: ActivatedRoute, private recitationService: RecitationService) { }

  async ngOnInit() {
    const id = this.route.snapshot.params['id'];
    await this.recitationService.getAllRecitations(id).then(recitations => recitations.subscribe(r => {
      this.recitations = r;
    }))

  }

}
