import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient , HttpErrorResponse} from '@angular/common/http';
import { BehaviorSubject, Observable, from, of, EMPTY, throwError } from 'rxjs';
import { catchError,map, concatMap, finalize } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { User } from './model/user';

const baseUrl = `${environment.apiUrl}/users`;


@Injectable({ providedIn: 'root' })

export class UserService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<User>(null);
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

    login() {
        // login with facebook then authenticate with the API to get a JWT auth token
        this.facebookLogin()
            .pipe(concatMap(accessToken => this.apiAuthenticate(accessToken)))
            .subscribe(() => {
                // get return url from query parameters or default to home page
                const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                this.router.navigateByUrl(returnUrl);
            });
    }

    facebookLogin() {
        // login with facebook and return observable with fb access token on success
        return from(new Promise<fb.StatusResponse>(resolve =>
            FB.login(resolve, { scope: 'email' })))
            .pipe(concatMap(({ authResponse }) => {
                if (!authResponse) return EMPTY;
                return of(authResponse.accessToken);
            }));
    }

    apiAuthenticate(accessToken: string) {
        // authenticate with the api using a facebook access token,
        // on success the api returns an user object with a JWT auth token
        return this.http.post<any>(`${environment.apiUrl}/auth/facebook`, { accessToken })
            .pipe(map(user => {
                console.log(user);
                this.userSubject.next(user);
                this.startAuthenticateTimer();
                return user;
            }));
    }

    logout() {
        // revoke app permissions to logout completely because FB.logout() doesn't remove FB cookie
        FB.api('/me/permissions', 'delete', null, () => FB.logout());
        this.stopAuthenticateTimer();
        this.userSubject.next(null);
        this.router.navigate(['/login']);
    }

    getAll() {
        //return this.http.get<User[]>(`${baseUrl}`);
        return this.http.get<User[]>(`${baseUrl}`)
      .pipe(
        catchError(this.handleError)
      )
    }

    getById(id) {
        return this.http.get<User>(`${baseUrl}/${id}`);
    }
    
    update(id, params) {
        return this.http.put(`${baseUrl}/${id}`, params)
            .pipe(map((user: any) => {
                // update the current account if it was updated
                if (user.id === this.userValue.userId) {
                    // publish updated account to subscribers
                    user = { ...this.userValue, ...user };
                    this.userSubject.next(user);
                }
                return user;
            }));
    }

    delete(id: string) {
        return this.http.delete(`${baseUrl}/${id}`)
            .pipe(finalize(() => {
                // auto logout if the logged in account was deleted
                if (id === this.userValue.userId)
                    this.logout();
            }));
    }

    // helper methods

    private authenticateTimeout;

    private startAuthenticateTimer() {

        const jwtToken = JSON.parse(atob(this.userValue.appToken.split('.')[1]));

        // set a timeout to re-authenticate with the api one minute before the token expires
        // note this code currently only works for reauthenicating with facebook
        const expires = new Date(jwtToken.exp * 1000);
        const timeout = expires.getTime() - Date.now() - (60 * 1000);
        console.log('timeout is ' + timeout);
        const { accessToken } = FB.getAuthResponse();
        this.authenticateTimeout = setTimeout(() => {
            this.apiAuthenticate(accessToken).subscribe();
        }, timeout);
    }

    private stopAuthenticateTimer() {
        // cancel timer for re-authenticating with the api
        clearTimeout(this.authenticateTimeout);
    }

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