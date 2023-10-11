import { Component, OnInit } from '@angular/core';
import {ReaderService} from "../../data/reader/reader.service";
import {ReaderModel} from "../model/reader.model";

@Component({
  selector: 'app-coran',
  templateUrl: './coran.page.html',
  styleUrls: ['./coran.page.scss'],
})
export class CoranPage implements OnInit {
  readers: ReaderModel[] = [];
  constructor(private reader: ReaderService) { }

  ngOnInit() {
    this.reader.getAllReaders().then(
      readers => readers.subscribe(r =>{
        this.readers = r;
    }))
  }

}
