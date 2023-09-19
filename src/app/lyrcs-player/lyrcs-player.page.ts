import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-lyrcs-player',
  templateUrl: './lyrcs-player.page.html',
  styleUrls: ['./lyrcs-player.page.scss'],
})
export class LyrcsPlayerPage implements OnInit,AfterViewInit {
  @Input()
  src!: string;
  @ViewChild('audiofile',{read:ElementRef}) playerElementRef: any;
  next:number = 0;
  activeElement:string = "element1";
  surah1:any;
  //"../../assets/coran/audio/1/001001.mp3"

  isPlaying = false;
  isLoading = false;
  currentTime = 0;
  duration = 0;
  repeate = true;
  sourateId:any;
  souratesAudiosPathAbsolute =  "../../assets/coran/audio/allsourates/"; //"1/00100"
  souratePath = "";

  private _player!: HTMLAudioElement;
  constructor(route:ActivatedRoute) { 
    this.sourateId = route.snapshot.queryParamMap.get('sourate');
    this.souratePath = this.getSouratePath(this.formatNumber(1));
      console.log(this.souratePath);
  }

  getSouratePath(verset:string):string{
    return this.souratesAudiosPathAbsolute
    +this.formatNumber(this.sourateId)+verset+".mp3";
  
  }
  ngOnInit() {
    //
    this.getJsonFile().then((result:any) => {
      this.surah1 = result;
      console.log('Result:', result);
    }).catch((error:any) => {
      console.error('Error:', error);
    });
   // Dans cet exemple, nous utilisons la méthode then pour chaîner les opérations à exécuter après la résolution de la promesse fetch. Les erreurs sont gérées avec .catch pour capturer les éventuelles erreurs lors de la récupération des données JSON. Cette approche est similaire à l'utilisation de await avec une fonction asynchrone, mais elle ne nécessite pas de déclarer explicitement la fonction comme asynchrone.
    
    ;
    console.log(this.surah1);
  }
formatNumber(num: number): string {
    // Utilise la méthode toString() pour convertir le nombre en chaîne de caractères
    // Ensuite, utilise la méthode padStart() pour ajouter des zéros à gauche jusqu'à ce que la chaîne ait une longueur de 3 caractères
    return num.toString().padStart(3, '0');
}

  ngAfterViewInit(): void {
    console.log(this.playerElementRef);
   this._player = this.playerElementRef.nativeElement;
   this._bindPlayerEvents();
}
  lafin(ev:any) {
    this.nextAya();
  }   
  getJsonFile(){

//'https://api.alquran.cloud/v1/quran/quran-uthmani'
  return fetch('./assets/coran/ayah.json').then(res => res.json()).then(json =>{
        console.log(json.filter((item:any) => item.sourate_id === "114"));
     return json.filter((item:any) => item.sourate_id === this.sourateId);
    //console.log(decodeURIComponent(json))
  })
  console.log(this.surah1);
    return this.surah1;
  }

  
  play(): void {
    this._player.paused ? this._player.play() : this._player.pause();
  }
  reload(){
    this.next = 0;
    this.activeElement = "element"+(this.next+1);
    this._player.src = this.getSouratePath(this.next+1+"");
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
