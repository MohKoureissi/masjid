import {PrecheurModel} from "./precheur.model";

export interface PreacheModel {
  id?: string | null;
  title: string;
  precheurId: string;
  preacheUrl: string|null;
  time:string
}
