import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as jexcel from "jexcel";
import { QuizService } from '../../services/quiz.service';
@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.css'],
  providers: [QuizService]
})
export class QuizListComponent implements OnInit, AfterViewInit {
  quizTable;
  constructor(private afs: AngularFirestore, private quizService: QuizService,) { }
  ngAfterViewInit(): void {
    this.quizTable = jexcel(document.getElementById("my-spreadsheet"), {
      data: [[]],
      columns: [
        { type: 'text', name: 'QuestionsName', title: 'Questions Name', width: 200 },
        { type: 'text', name: 'Option1', title: 'Option 1 (Correct answer)', width: 200 },
        { type: 'text', name: 'Option2', title: 'Option 2', width: 200 },
        { type: 'text', name: 'Option3', title: 'Option 3', width: 200 },
        { type: 'text', name: 'Option4', title: 'Option 4', width: 200 },
      ],
    });
  }

  ngOnInit(): void {
  }
  Submit() {
    debugger
    console.log(this.quizTable.getJson())
    this.quizService.get('data/javascript.json').subscribe(res => {
      const userRef = this.afs.collection(`quiz`);
      userRef.add(res);
    });
  }
}
