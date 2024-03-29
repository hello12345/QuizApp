import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuizComponent } from './quiz/quiz.component';
import { FormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { HomeComponent } from './home/home.component';

// const config ={
//   apiKey: "AIzaSyA1xuJCq3xgCLy062Ke9XcY0EUZVxUw3eQ",
//   authDomain: "authwithangular-1f1a9.firebaseapp.com",
//   projectId: "authwithangular-1f1a9",
//   storageBucket: "authwithangular-1f1a9.appspot.com",
//   messagingSenderId: "879198193282",
//   appId: "1:879198193282:web:03bf3f57324e386bd8169b"
// };
const config = {
  apiKey: "AIzaSyBOCbmD8p1XkFVqTOynXvYM3Z0wvfEMPYU",
  authDomain: "quizapp-b0de4.firebaseapp.com",
  projectId: "quizapp-b0de4",
  storageBucket: "quizapp-b0de4.appspot.com",
  messagingSenderId: "642256377578",
  appId: "1:642256377578:web:4cc3326c43ac8359afe993",
  measurementId: "G-8D5B5KLTT5"
};
@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
