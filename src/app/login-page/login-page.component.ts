import { loginUrl } from './../shared/api.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  formGroup: FormGroup

  constructor(private formBuilder: FormBuilder, private api: ApiService, private router: Router) { }

  ngOnInit() {

    this.formGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })

  }

  submit(){
    if(this.formGroup.controls['username'].value === '' || this.formGroup.controls['password'].value === ''){
      alert('Invalid input')
      return
    }
    let body = {
      username: this.formGroup.controls['username'].value, 
      password: this.formGroup.controls['password'].value
    }
    this.api.post(loginUrl, body). subscribe(res => {
      if(!res.success){
        alert('User not found')
        return
      }
      sessionStorage.setItem("user", JSON.stringify(res.response))
      this.router.navigate(['./main'])
    })
  }

}
