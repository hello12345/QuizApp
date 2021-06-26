import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,public auth: AuthService) { }
  model: any = {};

  ngOnInit(): void {
  }
  onSubmit() {
    // this.router.navigate(['/quiz']);
    
  }
  onGoogleLogin(){
  this.auth.googleSignin().then((result)=>{
    this.router.navigate(['/quiz']);
    // this.model.email=result.email
  })
  
}
}
