import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  user: {email: string, password: string} = {email: "", password: ""};
  isLoading: boolean = false;
  error: any = null;

  constructor(private router:Router, private authService: AuthService) { }

  ngOnInit(): void {
    if(!!this.authService.user.getValue()){
      this.router.navigate(['/']);
    }
  }

  login(form : NgForm) {
    let authObs: Observable<AuthResponseData>;
    this.isLoading = true;
    if(!form.valid) {
      return;
    }
    authObs = this.authService.login(form.value.email,form.value.password);

    authObs.subscribe(
      resData => {
        this.isLoading = false;
        this.router.navigate(['produits']);
      }, 
      error => {
        this.error = error;
        this.isLoading = false;
      }
    );

    form.reset();
  }
}
