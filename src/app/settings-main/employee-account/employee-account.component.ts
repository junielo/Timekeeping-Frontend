import { userUrl } from './../../shared/api.service';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-employee-account',
  templateUrl: './employee-account.component.html',
  styleUrls: ['./employee-account.component.css']
})
export class EmployeeAccountComponent implements OnInit {

  user_list: any[] = []

  constructor(private api: ApiService) { }

  ngOnInit() {
    let currentUser = JSON.parse(sessionStorage.getItem('user'))
    console.log(currentUser)
    this.api.post(userUrl, {id: currentUser.emp_id}).subscribe(res => {
      console.log(res)
      this.user_list = res.response
    })
  }

}
