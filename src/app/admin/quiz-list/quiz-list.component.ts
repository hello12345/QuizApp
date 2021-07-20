import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as jexcel from "jexcel";
import { Question, Option, Quiz } from 'src/app/models';
import { QuizService } from '../../services/quiz.service';
@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.css'],
  providers: [QuizService]
})
export class QuizListComponent implements OnInit, AfterViewInit {
  quizTable;
  quizForm: FormGroup;
  quizes = [];
  constructor(private afs: AngularFirestore, private quizService: QuizService, public fb: FormBuilder) { }
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
      minDimensions: [5, 5]
    });
  }

  ngOnInit(): void {
    this.quizForm = this.fb.group({
      Name: [], Description: [], Duration: []
    });
    var qiz = this.afs.collection('quiz').get().forEach((x: any) => {
      
      x.docs.forEach((doc: any) => {
        
        console.log(doc.id, '=>', doc.data());
        this.quizes.push(doc.data())
      })
    });
  }
  Submit() {
    debugger
    var Questions = this.quizTable.getJson();
    // var d = this.afs.createId();
    if (Questions && Questions.length > 0) {
      var questions = [];
      for (const Q of Questions) {
        if (Q.QuestionsName) {
          let Que = new Question({});
          Que.id = this.afs.createId();
          Que.name = Q.QuestionsName;
          Que.questionTypeId = 1;

          let opt1 = new Option('');
          opt1.id = this.afs.createId();
          opt1.questionId = Que.id;
          opt1.name = Q.Option1;
          opt1.isAnswer = true;
          Que.options.push(opt1);

          let opt2 = new Option('');
          opt2.id = this.afs.createId();
          opt2.questionId = Que.id;
          opt2.name = Q.Option2;
          opt2.isAnswer = false;
          Que.options.push(opt2);

          let opt3 = new Option('');
          opt3.id = this.afs.createId();
          opt3.questionId = Que.id;
          opt3.name = Q.Option3;
          opt3.isAnswer = false;
          Que.options.push(opt3);

          let opt4 = new Option('');
          opt4.id = this.afs.createId();
          opt4.questionId = Que.id;
          opt4.name = Q.Option4;
          opt4.isAnswer = false;
          Que.options.push(opt4);
          questions.push(Que);
        }
      }
      if (questions && questions.length > 0) {
        let quiz = new Quiz('');
        quiz.description = this.quizForm.value.Description;
        quiz.name = this.quizForm.value.Name;
        quiz.Duration = this.quizForm.value.Duration;
        quiz.questions = questions;
        const userRef = this.afs.collection(`quiz`);

        userRef.add(JSON.parse(JSON.stringify(quiz))).then(val => {

        });
      }
    }
  }
}
