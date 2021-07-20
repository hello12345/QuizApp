import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  quizes = [];
  Myquizes = [];
  constructor(private firestore: AngularFirestore, private auth: AuthService) { }

  ngOnInit(): void {
    this.firestore
      .collection('quiz')
      .get()
      .forEach((x: any) => {
        x.docs.forEach((doc: any) => {
          this.quizes.push({ id: doc.id, name: doc.data().name, description: doc.data().description });
        });
      });
    this.auth.user$.subscribe(val => {      
      this.Myquizes = val.quiz;
    });
  }
}
