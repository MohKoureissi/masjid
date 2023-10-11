import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, Input } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {RecitationModel} from "../model/recitation.model";
import {RecitationService} from "../../data/recitation/recitation.service";
import { saveAs } from 'file-saver';

import {NativeAudio} from '@capacitor-community/native-audio'
import {HttpClient} from "@angular/common/http";


//import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-player',
  templateUrl: './player.page.html',
  styleUrls: ['./player.page.scss'],
})
export class PlayerPage implements OnInit {
  surah!: string;
  reader!: string;
  recitation!: RecitationModel|null;
  isPlay: boolean = false;
  iconPlay: string = "play-outline";
  currentTimeNumber: number = 0;
  currentTimeText: string = "00:00";
  //duration!: number;
  durationText: string = "00:00";
  audioInterval: any;

  constructor(private route: ActivatedRoute, private recitationService: RecitationService, private http: HttpClient) {

  }

  async ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.surah = params['surahId'];
      this.reader = params['readerId'];
    });

    await this.recitationService.getRecitation(this.reader, this.surah).then(
      recitation => {
        this.recitation = recitation
        console.log("==>1="+this.recitation?.downloadUrl)
      }
    );
    if (this.recitation == null){
      console.log("Erreur: Recitation introuvable");
    }
    await this.loadAudio()
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
















  async loadAudio() {
    console.log(this.recitation?.downloadUrl)
    console.log(this.recitation?.id)
    if (this.recitation) {
      // Déchargez l'asset audio actuel s'il est déjà chargé
      /*await NativeAudio.unload({
        assetId: 'fire'
      });*/

      await NativeAudio.preload({
        assetId: this.recitation.id!,
        assetPath: this.recitation?.downloadUrl!,
        audioChannelNum: 1,
        isUrl: true
      });

      console.log("==>2="+this.recitation?.downloadUrl)

      await NativeAudio.getDuration({
        assetId: this.recitation.id!
      })
        .then(result => {
          this.duration = result.duration;

          const totalDuration = Math.floor(this.duration);
          const minutes = String(Math.floor(totalDuration / 60)).padStart(2, '0');
          const seconds = String(totalDuration % 60).padStart(2, '0');
          this.durationText = minutes + ':' + seconds;
        });
    }
    else{
      console.log("Impossible de charger l'audio");
    }
  }


  async playPause() {
    /*if (this.isPlay) {
      NativeAudio.pause({
        assetId: this.recitation?.id!,
      });

      this.isPlay = false
      this.iconPlay = "play-outline"
    } else {
      NativeAudio.resume({ // Reprenez la musique
        assetId: this.recitation?.id!,
      });
      this.isPlay = true
      this.iconPlay = "pause-outline"


      this.audioInterval = setInterval(async ()=>{
        this.currentTimeNumber = await this.getCurrentTime();
        this.secondsToMinutesAndSeconds(this.currentTimeNumber);
      }, 1000)
    }*/
  }

  async getCurrentTime() {
    let time = 0;
    await NativeAudio.getCurrentTime({
      assetId: this.recitation?.id!
    })
  .then(result => {
      time = result.currentTime
    });
    return time;
  }

  secondsToMinutesAndSeconds(totalSeconds: number) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    this.currentTimeText =  `${formattedMinutes}:${formattedSeconds}`;
  }

  async downloadMp3(url: string, fileName: string) {
    await this.http.get(url, { responseType: 'blob' }).subscribe((response: Blob) => {
      saveAs(response, fileName);
    });
  }

  ngOnDestroy() {
    // Arrêtez l'audio lorsque le composant est détruit
    NativeAudio.stop({
      assetId: this.recitation?.id!
    });
  }

}
