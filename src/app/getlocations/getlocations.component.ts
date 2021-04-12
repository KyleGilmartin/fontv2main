import { Component, Input, OnInit } from '@angular/core';
import { PlayerService } from '../location.service';
import { ILocation } from '../model/location';
import { GoogleMapsComponent } from '../components/google-maps/google-maps.component'
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-getlocations',
  templateUrl: './getlocations.component.html',
  styleUrls: ['./getlocations.component.css']
})
export class GetlocationsComponent implements OnInit {
locationList: ILocation[];
message: String;
currentLocation: ILocation;
@Input() showDiv: Boolean;

  constructor(private locationService: PlayerService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.locationService.getLocation().subscribe({
      next:(value: ILocation[]) =>this.locationList = value,
      complete:() => console.log('location service done'),
      error:(mess) =>this.message = mess
    })
    
  }

  isSelected(location: ILocation): boolean{
    if (!location || !this.currentLocation) {
      return false;
    }
    else {
      return location.id === this.currentLocation.id;
    }
  }
  openDialog(e) {
    this.dialog.open(GoogleMapsComponent,{data  : e});
  }
  deleteLocation(loc){
    let l = this.locationList.filter(f=>{return f.id!==loc.id})
    this.locationList = l
  
  }
  
 

}
