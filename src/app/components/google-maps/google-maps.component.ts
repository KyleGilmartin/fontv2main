import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PlayerService } from 'src/app/location.service';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject , HostListener} from '@angular/core';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.css']
})
export class GoogleMapsComponent implements OnInit {
  postData: FormGroup;
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  image: object;
  private geoCoder;
  coverImagePreview:string;
  imgCheck=false;
  success:boolean;
  user:any
  @ViewChild('search', {static:true})
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private locationService: PlayerService,
    public snackBar: MatSnackBar,
    private router:Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  @ViewChild('nodeInput' ) fileInput: ElementRef;
  ngOnInit() {
    this.postData = new FormGroup({
      description : new FormControl(null),
      image : new FormControl(null),
      locName : new FormControl(null),
      latitude : new FormControl(null),
      longitude : new FormControl(null),
    })

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;
      if(this.data){
        this.latitude = this.data.lat;
        this.longitude = this.data.lon;
        this.getAddress(this.latitude, this.longitude); 
        window.document.getElementById("my-element").click();
      }


      
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    }); 
  }
  onClick(event) {
    console.log(event);
  }
  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }


  markerDragEnd($event: MouseEvent) {
    console.log($event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }
  
  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
          console.log(this.address)
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
      
    });
  }
  file;
  onCoverImagePick(event:Event){
    this.file = (event.target as HTMLInputElement).files[0];
    // console.log(file);
    if(this.file.type=="image/jpeg" || this.file.type=="image/jpg" || this.file.type=="image/png"){
      this.postData.patchValue({coverImage:this.file});
      this.postData.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload=()=>{
      this.coverImagePreview = this.file.name;
    };
    reader.readAsDataURL(this.file)
    this.imgCheck = true;
  }
  else{
    this.coverImagePreview = '';
    this.warn("Please Upload Valid Image Formate (e.g: jpg,png,jpeg)");
  }
  }
  
  config: MatSnackBarConfig = {
    duration: 4000,
    horizontalPosition: 'center',
    verticalPosition: 'bottom',
    panelClass: 'success-snacbar'
  }
  config1: MatSnackBarConfig = {
    duration: 4000,
    horizontalPosition: 'center',
    verticalPosition: 'bottom',
    panelClass: 'warn-snacbar'
  }
  
  successMsg(msg) {
    this.snackBar.open(msg, '',this.config);
  }
  
  warn(msg) {
    this.snackBar.open(msg, '', this.config1);
  }
  response;
  onSubmit(locName:string){
    this.locationService.submitPost(this.postData.value.description,this.file,locName,
    this.latitude,this.longitude).subscribe((res)=>{
      // this.success = res.success;
      this.response = res;
      if(this.response.success){
      this.successMsg("Success");
      window.location.reload();
      }else{
        this.warn("Somthing Wrong");
      }
    },err=>{
      this.warn("An Error occur => " + err.error.message);

    })
  }
}
