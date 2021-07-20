import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { QuizComponent } from './quiz/quiz.component';
import { AuthGuard } from './auth.guard'
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(x => x.AdminModule) },
  { path: ':id', component: QuizComponent, canActivate: [AuthGuard] },
  { path: '**', component: HomeComponent, canActivate: [AuthGuard]},
  { path: '', component: HomeComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
