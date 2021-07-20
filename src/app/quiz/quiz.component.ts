import { Component, OnInit } from '@angular/core';

import { QuizService } from '../services/quiz.service';
import { HelperService } from '../services/helper.service';
import { Option, Question, Quiz, QuizConfig } from '../models/index';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';

import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app'
import { map, take, tap } from 'rxjs/operators';
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  providers: [QuizService],
})
export class QuizComponent implements OnInit {
  IsName = false;
  Name = "";
  id = '';
  uid;
  quizes = [];
  allquize = [];
  quiz: Quiz = new Quiz(null);
  mode = 'quiz';
  quizName: string;
  config: QuizConfig = {
    'allowBack': true,
    'allowReview': true,
    'autoMove': false,  // if true, it will move to next question automatically when answered.
    'duration': 300,  // indicates the time (in secs) in which quiz needs to be completed. 0 means unlimited.
    'pageSize': 1,
    'requiredAll': false,  // indicates if you must answer all the questions before submitting.
    'richText': false,
    'shuffleQuestions': true,
    'shuffleOptions': true,
    'showClock': true,
    'showPager': true,
    'theme': 'none'
  };

  pager = {
    index: 0,
    size: 1,
    count: 1
  };
  timer: any = null;
  startTime: Date;
  endTime: Date;
  ellapsedTime = '00:00';
  duration = '';

  constructor(
    private quizService: QuizService,
    private auth: AuthService,
    private router: Router,
    private firestore: AngularFirestore, private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.firestore
      .collection('quiz')
      .get()
      .forEach((x: any) => {
        x.docs.forEach((doc: any) => {
          this.quizes.push({ id: doc.id, name: doc.data().name });
          this.allquize.push({ id: doc.id, name: doc.data() })
          this.quizName = this.id;
          this.loadQuiz(this.quizName);
        });
      });
    this.auth.user$.subscribe(val => {
      this.uid = val.uid;
    });
  }
  loadQuiz(quizName: string) {
    let resultQuiz = this.allquize.filter((q) => q.id === quizName).map((x) => {
      return x.name
    })
    this.quiz = new Quiz(resultQuiz[0]);
    this.quiz.questions.forEach(x => {
      x.options = this.shuffle(x.options)
    })
    this.pager.count = this.quiz.questions.length;
    this.startTime = new Date();
    this.ellapsedTime = '00:00';
    this.timer = setInterval(() => {
      this.tick();
    }, 1000);
    debugger
    this.duration = this.parseTime(this.quiz.Duration);
    this.mode = 'quiz';
  }
  parseTime(totalSeconds: number) {
    let mins: string | number = Math.floor(totalSeconds / 60);
    let secs: string | number = Math.round(totalSeconds % 60);
    mins = (mins < 10 ? '0' : '') + mins;
    secs = (secs < 10 ? '0' : '') + secs;
    return `${mins}:${secs}`;
  }
  tick() {
    const now = new Date();
    const diff = (now.getTime() - this.startTime.getTime()) / 1000;
    if (diff >= this.quiz.Duration) {
      this.onSubmit();
    }
    this.ellapsedTime = this.parseTime(diff);
  }
  onSubmit() {
    let answers = [];
    let cntCorrect = 0;
    let cntAnswered = 0;
    debugger;
    this.quiz.questions.forEach((x) => {
      if (this.isCorrect(x) == 'correct') {
        cntCorrect = cntCorrect + 1;
      }
      if (this.isAnswered(x) == 'Answered') {
        cntAnswered = cntAnswered + 1;
      }
      answers.push({
        quizId: this.quiz.id,
        questionId: x.id,
        answered: x.answered,
      })
    });

    // Post your data to the server here. answers contains the questionId and the users' answer.    
    this.mode = 'result';
    let obj = JSON.parse(JSON.stringify(this.quiz))
    obj.Correct = cntCorrect;
    obj.Answered = cntAnswered;
    obj.UserSelectedName = this.Name;
    const userRef = this.firestore.doc(`users/${this.uid}`);
    userRef.update({
      quiz: firebase.firestore.FieldValue.arrayUnion(obj)
    }).then(val => {
      setInterval(() => {
        this.router.navigate(['/']);
      }, 3000);
    });

  }

  goTo(index: number) {
    if (index >= 0 && index < this.pager.count) {
      this.pager.index = index;
      this.mode = 'quiz';
    }
  }

  isAnswered(question: Question) {
    return question.options.find((x) => x.selected)
      ? 'Answered'
      : 'Not Answered';
  }

  isCorrect(question: Question) {
    return question.options.every((x) => x.selected === x.isAnswer)
      ? 'correct'
      : 'wrong';
  }
  onSelect(question: Question, option: Option) {
    if (question.questionTypeId === 1) {
      question.options.forEach((x) => {
        if (x.id !== option.id) x.selected = false;
      });
    }

    if (this.config.autoMove) {
      this.goTo(this.pager.index + 1);
    }
  }
  get filteredQuestions() {
    return this.quiz.questions
      ? this.quiz.questions.slice(
        this.pager.index,
        this.pager.index + this.pager.size
      )
      : [];
  }
  logout() {
    this.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }
  shuffle(array) {
    let currentIndex = array.length, temp, randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temp = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temp;
    }
    return array;
  }
  SaveName() {
    if (this.Name) {
      this.IsName = !this.IsName;
      this.startTime = new Date();
    }
  }
}
