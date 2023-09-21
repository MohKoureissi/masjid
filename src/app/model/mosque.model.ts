export interface Mosque{
  id: string|null;
  name: string;
  imageUrl: string|null;
  imamName: string;
  numDonation: number;
  descDonation: string;
  location: string;
  quartier: string;
  lat: number;
  lng: number;
  fajr: string;
  dohr: string;
  asr: string;
  maghreb: string;
  isha: string;
  djumha: string
}
