import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { QuizComponent } from './quiz/quiz.component';
import { AuthGuard } from './auth.guard'


const routes: Routes = [
  { path: 'quiz', component: QuizComponent,canActivate: [AuthGuard]  },
  { path: 'login', component: LoginComponent },
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
