import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ILocation } from './model/location';
import { catchError, map, tap } from 'rxjs/operators'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  //  private dataUri = 'http://localhost:3000/players'

  dataUri = `${environment.apiUrl}/locations`;
  constructor(private http: HttpClient) { }

  addLocation(location: ILocation): Observable<ILocation> {
    return this.http.post<ILocation>(this.dataUri, location)
      .pipe(
        catchError(this.handleError)
      )
  }

  submitPost(description:string,image:File,name:string,latitude:number,longitude:number){
    const uid = window.localStorage.getItem("uid");
    const postData = new FormData();
    postData.append('location',name);
    postData.append('uid',uid);
    postData.append('image', image);
    postData.append('longitude',longitude.toString());
    postData.append('latitude',latitude.toString());
    postData.append('description',description);
    return this.http.post('https://localhost:8080/locations/post',postData)
  }
  delete(id: string) {
    console.log('----ff',this.dataUri)
    return this.http.delete(`${this.dataUri}/${id}`)
        .pipe(catchError(this.handleError));
  }
  // deletePost(postId: string){
  //   this.http.delete('http://localhost:3200/app/posts/' + postId)
  //   .subscribe(() => {
  //     console.log('Deleted!');
  //   });
  // }
  updateLocation(id: string, location: ILocation): Observable<ILocation> {
    console.log('subscribing to update' + id);
    let locationURI: string = this.dataUri + '/' + id;
    return this.http.put<ILocation>(locationURI, location)
      .pipe(
        catchError(this.handleError)
      )
  }

  getLocation(): Observable<ILocation[]> {

    console.log("get Location called");



    return this.http.get<ILocation[]>(`${this.dataUri}?limit=200`)
      .pipe(
        catchError(this.handleError)
      )
  }

  //taken from: https://angular.io/guide/http

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.


      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${JSON.stringify(error.error)}`);



      // question over how much information you want to give to the end-user
      // it depends on who will be using the system
      // this information would not be returned in a public interface but might in an intranet.

      if (error.status == 412) {
        return throwError('412 Error' + JSON.stringify(error.error))
      }

    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

}


