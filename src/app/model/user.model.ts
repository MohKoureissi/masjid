import { Announcements } from "./announcement.model";
import { Mosque } from "./mosque.model";

export interface Users{
  id:String;
  fullName: string;
  numTel: string;
  email: string;
  password: string;
  mosques: Mosque[];
  announcements: Announcements[];
  subscribedMosques: Mosque[];
  // actions: ['itineraire', 'favoris', 'informations'],

}
