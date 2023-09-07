import { Announcements } from "./announcement.model";
import { Mosque } from "./mosque.model";

export interface Users{
 
  fullName: string;
  numTel: string;
  email: string;
  password: string;
  mosques: Mosque[];
  announcements: Announcements[];
  subscribedMosques: Mosque[];

}
