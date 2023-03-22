// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  //apiUrl: '/api',
  apiUrl:'http://localhost:19248',
  firebase:{
  apiKey: "AIzaSyA0btsI2pQL1VKGgeDO_WahoU2yyujBPyo",
  authDomain: "vdtsite-f1ab7.firebaseapp.com",
  projectId: "vdtsite-f1ab7",
  storageBucket: "vdtsite-f1ab7.appspot.com",
  messagingSenderId: "467284471366",
  appId: "1:467284471366:web:9921c09502082313c0e447",
  measurementId: "G-0CDQ6512WR"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
