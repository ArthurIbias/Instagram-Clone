import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public title: string = 'app3';

  ngOnInit(): void {
    // Initialize Firebase
    firebase.initializeApp({
      apiKey: 'AIzaSyDXHH89pntI9TJcwqeo2rmgfYrZuOZ8ezo',
      authDomain: 'jta-instaclone-5dae8.firebaseapp.com',
      databaseURL: 'https://jta-instaclone-5dae8.firebaseio.com',
      projectId: 'jta-instaclone-5dae8',
      storageBucket: 'jta-instaclone-5dae8.appspot.com',
      messagingSenderId: '675542377882',
    });
  }
}
