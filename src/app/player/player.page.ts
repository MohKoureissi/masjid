import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {RecitationModel} from "../model/recitation.model";
import {RecitationService} from "../../data/recitation/recitation.service";

import {NativeAudio} from '@capacitor-community/native-audio'

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
  currentTimeText: string = "";
  duration!: number;
  audioInterval: any;

  constructor(private route: ActivatedRoute, private recitationService: RecitationService) { }

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

    await NativeAudio.preload({
      assetId: "fire",
      assetPath: "../../assets/audios/001.mp3",
      audioChannelNum: 1,
      isUrl: false
    });

    try {
      const result = await NativeAudio.getDuration({
        assetId: 'fire'
      });
      this.duration = result.duration;
      console.log("Durée de l'audio récupérée :", this.duration);
    } catch (error) {
      console.error("Erreur lors de l'obtention de la durée de l'audio : ", error);
    }
  }

  async playPause() {
    if (this.isPlay) {
      NativeAudio.pause({
        assetId: 'fire'
      });

      clearInterval(this.audioInterval);

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
    const seconds = totalSeconds % 60;

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    this.currentTimeText =  `${formattedMinutes}:${formattedSeconds}`;
  }


  ngOnDestroy() {
    // Arrêtez l'audio lorsque le composant est détruit
    NativeAudio.stop({
      assetId: 'fire'
    });
    clearInterval(this.audioInterval);
  }

}
