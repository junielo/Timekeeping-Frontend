import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ApiService, getEmployeesUrl } from 'src/app/shared/api.service';

@Component({
  selector: 'app-employee-leave',
  templateUrl: './employee-leave.component.html',
  styleUrls: ['./employee-leave.component.css']
})
export class EmployeeLeaveComponent implements OnInit {

  id: number
  data: any = []
  leave: string = 'vacation'
  tmp_leave: any[] = []

  constructor(@Inject(MAT_DIALOG_DATA) id, public dialogRef: MatDialogRef<EmployeeLeaveComponent>, private api: ApiService) { 
    this.id = id
  }

  ngOnInit() {
    this.api.get(getEmployeesUrl + "?id=" + this.id).subscribe(res => {
      this.data = res.employee[0]
    })
  }

  addLeave(){
    let body = {
      reason:'',
      date:''
    }
    this.tmp_leave.push(body)
  }

}
