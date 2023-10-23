import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {RadioModel} from "../model/radio.model";
import {RadioService} from "../../data/radio/radio.service";
import {ActivatedRoute} from "@angular/router";

import {HttpClient} from "@angular/common/http";
import {PreacheModel} from "../model/preache.model";
import {PreachService} from "../../data/preach/preach.service";

@Component({
  selector: 'app-r-player',
  templateUrl: './r-player.page.html',
  styleUrls: ['./r-player.page.scss'],
})
export class RPlayerPage implements OnInit {
  radio!: RadioModel|null;
  id: string|null=null;

  constructor(private radioService: RadioService, private route: ActivatedRoute) { }

  async ngOnInit() {
    await this.route.queryParams.subscribe(params => {
      this.id = params['idRadio'];
    });

    await this.radioService.getRadio(this.id!).then(radio => this.radio = radio);
    if(this.radio == null){
      console.log("La radio récherché n'existe pas")
    }
  }
























  @Input()
  src!: string;
  @ViewChild('audiofile',{read:ElementRef}) playerElementRef: any;
  next:number = 0;
  activeElement:string = "element1";
  //"../../assets/coran/audio/1/001001.mp3"

  isPlaying = false;
  isLoading = false;
  currentTime = 0;
  duration = 0;
  repeate = true;

  private _player!: HTMLAudioElement;


  ngAfterViewInit(): void {
    console.log(this.playerElementRef);
    this._player = this.playerElementRef.nativeElement;
    this._bindPlayerEvents();
  }
  lafin(ev:any) {
    this.nextAya();
  }


  getJsonFile():any{
    const audioTag = document.getElementById('audioFile');

    //'./assets/names/99_Names_Of_Allah.json'
    //
    const surah1 =  [
      {
        "number": 1,
        "text": "﻿بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
        "numberInSurah": 1,
        "juz": 1,
        "manzil": 1,
        "page": 1,
        "ruku": 1,
        "hizbQuarter": 1,
        "sajda": false
      },
      {
        "number": 2,
        "text": "ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَٰلَمِينَ",
        "numberInSurah": 2,
        "juz": 1,
        "manzil": 1,
        "page": 1,
        "ruku": 1,
        "hizbQuarter": 1,
        "sajda": false
      },
      {
        "number": 3,
        "text": "ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
        "numberInSurah": 3,
        "juz": 1,
        "manzil": 1,
        "page": 1,
        "ruku": 1,
        "hizbQuarter": 1,
        "sajda": false
      },
      {
        "number": 4,
        "text": "مَٰلِكِ يَوْمِ ٱلدِّينِ",
        "numberInSurah": 4,
        "juz": 1,
        "manzil": 1,
        "page": 1,
        "ruku": 1,
        "hizbQuarter": 1,
        "sajda": false
      },
      {
        "number": 5,
        "text": "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
        "numberInSurah": 5,
        "juz": 1,
        "manzil": 1,
        "page": 1,
        "ruku": 1,
        "hizbQuarter": 1,
        "sajda": false
      },
      {
        "number": 6,
        "text": "ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ",
        "numberInSurah": 6,
        "juz": 1,
        "manzil": 1,
        "page": 1,
        "ruku": 1,
        "hizbQuarter": 1,
        "sajda": false
      },
      {
        "number": 7,
        "text": "صِرَٰطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا ٱلضَّآلِّينَ",
        "numberInSurah": 7,
        "juz": 1,
        "manzil": 1,
        "page": 1,
        "ruku": 1,
        "hizbQuarter": 1,
        "sajda": false
      }
    ]
    return surah1;

    fetch('https://api.alquran.cloud/v1/quran/quran-uthmani').then(res => res.json()).then(json =>{

      console.log(json.data.surahs[0]);
      //console.log(decodeURIComponent(json))
    })

  }

  play(): void {
    this._player.paused ? this._player.play() : this._player.pause();
  }
  reload(){
    this.next = 0;
    this.activeElement = "element"+(this.next+1);
    this._player.src = "../../assets/coran/audio/1/00100"+(this.next+1)+".mp3";
    this._player.play();
  }
  toggleRepeate():void{
    this.repeate =  this.repeate ? false: true;
  }
  previousAya() {
    const ayas = this.getJsonFile();

    if (this.next > 0) {
      this.next--; // Réduisez la valeur de this.next pour obtenir l'élément précédent
      this.activeElement = "element" + (this.next + 1);
      this._player.src = `../../assets/coran/audio/1/00100${this.next + 1}.mp3`;
      this._player.load(); // Chargez le nouveau fichier audio
      this._player.play(); // Jouez le nouveau fichier audio
    }
  }
  nextAya(){
    const ayas =  this.getJsonFile();
    if(this.next < ayas.length-1){
      this.next = ayas[this.next].number;
      this.activeElement = "element"+(this.next+1);
      console.log(this.activeElement);
      this._player.src = "../../assets/coran/audio/1/00100"+(this.next+1)+".mp3";
      this._player.play();
      return;
    }
    console.log("fin de la sourate")
    if(this.repeate){
      this.reload();
    }

  }

  seek({ detail: { value } }: { detail: { value: number } }): void {
    this._player.currentTime = value;
  }

  private _bindPlayerEvents(): void {
    this._player.addEventListener('playing', () => {
      this.isPlaying = true;
    });

    this._player.addEventListener('pause', () => {
      this.isPlaying = false;
    });

    this._player.addEventListener('timeupdate', () => {
      this.currentTime = Math.floor(this._player.currentTime);
    });

    this._player.addEventListener('seeking', () => {
      this.isLoading = true;
    });

    this._player.addEventListener('seeked', () => {
      this.isLoading = false;
    });

    this._player.addEventListener('loadstart', () => {
      this.isLoading = true;
    });

    this._player.addEventListener('loadeddata', () => {
      this.isLoading = false;
      this.duration = Math.floor(this._player.duration);
    });
  }
  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;

    return `${formattedMinutes}:${formattedSeconds}`;
  }

}
