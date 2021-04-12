import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  url = 'https://api.openweathermap.org/data/2.5/weather';
  apiKey = '10dc8998a8226f9de5d836d38d256706';

  constructor(private http: HttpClient) { }


  getWeatherDataByCoods(lat, lon) {
    let params = new HttpParams()
      .set('lat', lat)
      .set('lon', lon)
      .set('units', 'metric')
      .set('appid', this.apiKey)
    return this.http.get(this.url, { params });
  }
  getWeatherDatabyCity(city: string) {
    let params = new HttpParams()
       .set('q',city)
      .set('units', 'metric')
      .set('appid', this.apiKey)
    return this.http.get(this.url, { params });
  }

}