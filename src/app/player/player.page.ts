import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {RecitationModel} from "../model/recitation.model";
import {RecitationService} from "../../data/recitation/recitation.service";
import { saveAs } from 'file-saver';

import {NativeAudio} from '@capacitor-community/native-audio'
import {HttpClient} from "@angular/common/http";

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
  duration!: number;
  durationText: string = "00:00";
  audioInterval: any;

  constructor(private route: ActivatedRoute, private recitationService: RecitationService, private http: HttpClient) {
    NativeAudio.preload({
      assetId: "fire",
      assetPath: "../../assets/audios/001.wav",
      audioChannelNum: 1,
      isUrl: false
    });
  }

  async ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.surah = params['surahId'];
      this.reader = params['readerId'];
    });

    await this.recitationService.getRecitation(this.reader, this.surah).then(
      recitation => {
        this.recitation = recitation
      }
    );
    if (this.recitation == null){
      console.log("Erreur: Recitation introuvable");
    }


    await NativeAudio.getDuration({
      assetId: 'fire'
    })
      .then(result => {
        this.duration = result.duration

        const totalDuration = Math.floor(this.duration);
        const minutes = String(Math.floor(totalDuration / 60)).padStart(2, '0');
        const seconds = String(totalDuration % 60).padStart(2, '0');
        this.durationText = minutes + ':' + seconds;
      });
    console.log("Holla")
    console.log(this.duration)
  }

  async playPause() {
    if (this.isPlay) {
      NativeAudio.pause({
        assetId: 'fire'
      });

      this.isPlay = false
      this.iconPlay = "play-outline"
    } else {
      NativeAudio.resume({ // Reprenez la musique
        assetId: 'fire',
      });
      this.isPlay = true
      this.iconPlay = "pause-outline"


      this.audioInterval = setInterval(async ()=>{
        this.currentTimeNumber = await this.getCurrentTime();
        this.secondsToMinutesAndSeconds(this.currentTimeNumber);
        console.log(this.currentTimeText)
      }, 1000)
    }
  }

  async getCurrentTime() {
    let time = 0;
    await NativeAudio.getCurrentTime({
      assetId: 'fire'
    })
  .then(result => {
      time = result.currentTime
    //console.log(time)
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
      assetId: 'fire'
    });
  }




}
