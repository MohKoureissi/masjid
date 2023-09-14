import {PrecheurModel} from "./precheur.model";

export interface PreacheModel {
  id?: string | null;
  titre: string;
  precheur: PrecheurModel;
  preacheUrl: string|null;
}
