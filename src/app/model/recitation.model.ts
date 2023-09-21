import {SurahModel} from "./surah.model";

export interface RecitationModel {
  id: string|null;
  downloadUrl: string|null;
  apiUrl: string|null;
  duration: number; // la durée de la lecture en milli seconde
  readerId: string;
  recitationNumber: number;
  surah: SurahModel|null;
}
