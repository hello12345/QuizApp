import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { QuizListComponent } from './quiz-list/quiz-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [QuizListComponent],
  imports: [
    CommonModule,
    AdminRoutingModule, FormsModule, ReactiveFormsModule

  ]
})
export class AdminModule { }
