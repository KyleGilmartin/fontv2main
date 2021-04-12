import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { GoogleMapsComponent } from '../google-maps/google-maps.component'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  latitude: number;
  longitude: number;
  zoom:number;
  bool=false;

  openDialog() {
    this.dialog.open(GoogleMapsComponent);
  }
  ngOnInit() {
    this.setCurrentLocation();
    this.checkCredentioals();
  }

  checkCredentioals(){
    if(window.localStorage.user == "null"){
      this.bool = false;
    }
    else{
      this.bool = true;
    }
  }
  

    // Get Current Location Coordinates
    private setCurrentLocation() {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.zoom = 15;
        });
      }
    }  
}



