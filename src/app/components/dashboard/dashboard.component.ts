import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/user.Service';
import { NgAuthService } from "../../ng-auth.service";




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  constructor(public ngAuthService: NgAuthService, public userService: UserService) {
    console.log("dashboard cons")
  }

  userList:any
  message:""
  Taaa = true;

  ngOnInit(): void {
    console.log("dashboard")
    this.userService.getAll().subscribe({
      next:(value) =>{
        console.log("value",value)
        this.userList = value
      },
      complete:() => console.log('location service done'),
      error:(mess) =>this.message = mess
    })
  }

  addAdmin(email) {
    let addRole = firebase.functions().httpsCallable('addAdminRole');
    console.log(email.value)
    addRole({ email: email.value })
      .then((result) => {
        // Read result of the Cloud Function.
        console.log(result);
      }).catch((error) => {
        console.log(error);
      });
    return false;
  }

  removeAdmin(email) {
    let removeRole = firebase.functions().httpsCallable('removeAdminRole');
    removeRole({ email: email.value })
      .then((result) => {
        // Read result of the Cloud Function.
        console.log(result);
      }).catch((error) => {
        console.log(error);
      });
    return false;
  }

}
