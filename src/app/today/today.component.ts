import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css']
})
export class TodayComponent implements OnInit {
 
  lat;
  lon;
  weather;

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    // this.weatherService.getWeatherDataByCoods(35, 139).subscribe(console.log);
    this.getLocation();
  }

  getLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.watchPosition((success) => {
        this.lat = success.coords.latitude;
        this.lon = success.coords.longitude;
        console.log(this.lat, this.lon);

        this.weatherService.getWeatherDataByCoods(this.lat, this.lon).subscribe(data => {
          this.weather = data;
          console.log(this.weather.weather[0].icon)

        })
      })
    }
  }

  getCity(city) {
    this.weatherService.getWeatherDatabyCity(city).subscribe(data => {
      this.weather = data;
    })
  }

}
