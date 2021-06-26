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

const config ={
  apiKey: "AIzaSyA1xuJCq3xgCLy062Ke9XcY0EUZVxUw3eQ",
  authDomain: "authwithangular-1f1a9.firebaseapp.com",
  projectId: "authwithangular-1f1a9",
  storageBucket: "authwithangular-1f1a9.appspot.com",
  messagingSenderId: "879198193282",
  appId: "1:879198193282:web:03bf3f57324e386bd8169b"
};
@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
    LoginComponent
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
