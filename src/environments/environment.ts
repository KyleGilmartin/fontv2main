// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  // 2. Add your credentials from step 1
  production: false,
 apiUrl: 'https://localhost:8080', // your server side code
  facebookAppId: '426179471852917' ,

  firebase: {
    apiKey: "AIzaSyDMGvMuOAbqztSzo7gq6okKEDeIuk_BXmw",
  authDomain: "locationapp-9a780.firebaseapp.com",
  projectId: "locationapp-9a780",
  storageBucket: "locationapp-9a780.appspot.com",
  messagingSenderId: "372934126302",
  appId: "1:372934126302:web:f2486d72196ccca23fb04f",
  measurementId: "G-7RM9W3TT9C"

  }

  

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
