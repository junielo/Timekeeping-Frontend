import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ApiService, getEmployeesUrl, getNumLeaveUrl, addLeavesUrl, deleteLeaveUrl } from 'src/app/shared/api.service';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

import * as _moment from 'moment';
import { DatePipe } from '@angular/common';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@Component({
  selector: 'app-employee-leave',
  templateUrl: './employee-leave.component.html',
  styleUrls: ['./employee-leave.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class EmployeeLeaveComponent implements OnInit {

  id: number
  data: any = []
  leave: string = 'vacation'
  tmp_leave: any = []
  vacation_list: any = []
  sick_list: any = []
  leave_record: any = []
  remNum: number

  constructor(@Inject(MAT_DIALOG_DATA) id, public dialogRef: MatDialogRef<EmployeeLeaveComponent>, private api: ApiService) { 
    this.id = id
  }

  ngOnInit() {
    this.api.get(getEmployeesUrl + "?id=" + this.id).subscribe(res => {
      this.data = res.employee[0]
    })
    this.getRemaining()
    this.getData()
  }

  getRemaining(){
    this.api.post(getNumLeaveUrl, {id: this.id, type: this.leave}).subscribe(res => {
      this.remNum = res.remaining
    })
  }

  onLeaveChange(){
    this.getRemaining()
    if(this.leave === 'vacation'){
      this.sick_list = this.tmp_leave
      this.tmp_leave = this.vacation_list
    }else{
      this.vacation_list = this.tmp_leave
      this.tmp_leave = this.sick_list
    }
    this.getData()
  }

  addLeave(){
    if(this.remNum - this.tmp_leave.length <= 0){
      alert('No ' + this.leave + " leave remainng")
      return
    }
    let body = {
      reason:'',
      date:''
    }
    
    this.tmp_leave.push(body)

  }

  deleteLeave(i:number){
    this.tmp_leave.splice(i, 1)
  }

  create(){
    if(this.tmp_leave.length == 0){
      alert('Empty leave list')
      return
    }
    for(let tmp of this.tmp_leave) {
      tmp.date = new DatePipe('en-US').transform(tmp.date, 'yyyy-MM-dd')
      tmp.type = this.leave
      tmp.id = this.id
      if(tmp.reason === '' || tmp.date == null){
        alert('Fill all the forms and try again')
        return
      }
    }
    
    console.log(this.tmp_leave)
    this.api.put(addLeavesUrl, this.tmp_leave).subscribe(res => {
      if(res.success){
        this.tmp_leave = []
        if(this.leave === 'vacation'){
          this.vacation_list = []
        }else{
          this.sick_list = []
        }
        alert('Leave successfully added!')
        this.getRemaining()
        this.getData()
      }
    })
  }

  getData(){
    this.api.post(addLeavesUrl, {id: this.id, type: this.leave}).subscribe(res => {
      this.leave_record = res.response
      console.log(this.leave_record)
    })
  }

  delete(id){
    if(!confirm('Do you really want to delete this leave?')) return
    this.api.delete(deleteLeaveUrl, {id:id}).subscribe(res => {
      this.getRemaining()
      this.getData()
    })
  }

}
