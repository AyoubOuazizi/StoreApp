import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  user: {name: string, email: string, tel: string, password: string, address: string} = {name: "", email: "", tel: "", password: "", address: ""};
  valid: boolean = false;
  isLoading: boolean = false;
  error: any = null;
  tel: string = "";

  constructor(private authService : AuthService, private router: Router) { }

  ngOnInit(): void {
    if(!!this.authService.user.getValue()){
      this.router.navigate(['/']);
    }
  }

  signup(form : NgForm) {
    this.isLoading = true;
    if(!form.valid) {
      return;
    }
    this.authService.signup(form.value.email,form.value.password,form.value.name,this.tel,form.value.address).subscribe(
      resData => {
        this.isLoading = false;
        this.router.navigate(['/']);
      }, 
      error => {
        this.error = error;
        this.isLoading = false;
      }
    );
    form.reset();
  }

  hasError(event: any, form : NgForm) {
    this.valid = event;
    console.log(event);
    if (!event) {
      form.controls['tel'].setErrors({'incorrect': true});
    }
    else
      form.controls['tel'].setErrors(null);
  }

  getNumber(event: any) {
    this.tel = event;
  }
}
