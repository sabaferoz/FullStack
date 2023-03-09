export interface EntryInterface {
  id: string;
  date: string;
  visibility: VisibilityEnum;
  weather: WeatherEnum;
  comment?: string;
}

export enum VisibilityEnum {
  great = "great",
  good = "good",
  ok = "ok",
  poor = "poor",
}

export enum WeatherEnum {
  sunny = "sunny",
  rainy = "rainy",
  cloudy = "cloudy",
  stormy = "stormy",
  windy = "windy",
}
