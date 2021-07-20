import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'quizeApp';
  user;
  hide = false;
  constructor(
    private auth: AuthService, private router: Router,
  ) { }
  ngOnInit(): void {
    this.auth.user$.subscribe(val => {
      this.user = val;
    });
  }
  logout() {
    this.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
