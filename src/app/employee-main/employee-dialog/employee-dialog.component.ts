import { ApiService, getDropdownUrl, getEmployeesUrl } from './../../shared/api.service';
import { Component, OnInit, Inject } from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

import * as _moment from 'moment';
import { DatePipe } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

const moment = _moment;
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
  selector: 'app-employee-dialog',
  templateUrl: './employee-dialog.component.html',
  styleUrls: ['./employee-dialog.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class EmployeeDialogComponent implements OnInit {

  // date = new FormControl(moment());

  position: any[] = []
  department: any[] = []
  employee_status: any[] = []
  id: number
  data: any = []

  formGroup: FormGroup

  constructor(private api: ApiService, private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) id, public dialogRef: MatDialogRef<EmployeeDialogComponent>) { 
    this.id = id
  }

  ngOnInit() {

    this.initForm()
    this.api.get(getDropdownUrl).subscribe(res => {
      this.position = res.position
      this.department = res.department
      this.employee_status = res.employee_status
      if(this.id != 0) this.getData()
    })

  }

  initForm(){
    this.formGroup = this.formBuilder.group({
      fname: ['', Validators.required],
      mname: ['', Validators.required],
      lname: ['', Validators.required],
      position_id: ['', Validators.required],
      email: ['', Validators.required],
      number: ['', Validators.required],
      status_id: ['', Validators.required],
      sick_num: ['', Validators.required],
      vacation_num: ['', Validators.required],
      department: ['', Validators.required],
      date_employed: ['', Validators.required],
      birthdate: ['', Validators.required]
    })
  }

  getData(){
    this.api.get(getEmployeesUrl + "?id=" + this.id).subscribe(res => {
      console.log(res)
      this.data = res.employee[0]

      let selPos: any
      for(let d of this.position)
        if(d.id == this.data.pos_id)
          selPos = d

      let selStat: any
      for(let d of this.employee_status)
        if(d.id == this.data.stat_id)
          selStat = d

      let selDepts: any = []
      for(let d of this.department)
        for(let dep of this.data.depts)
          if(d.id == dep.dept_id)
            selDepts.push(d)

      this.formGroup.setValue({
        fname: this.data.fname,
        mname: this.data.mname,
        lname: this.data.lname,
        position_id: selPos,
        email: this.data.email,
        number: this.data.number,
        status_id: selStat,
        sick_num: this.data.sick_num,
        vacation_num: this.data.vacation_num,
        date_employed: this.data.date_employed,
        department: selDepts,
        birthdate: this.data.birthdate
      })
    })
  }

  submit(){
    if(this.formGroup.valid){
      let data = this.formGroup.getRawValue()
      var datePipe = new DatePipe('en-US');
      data.date_employed = datePipe.transform(data.date_employed, 'yyyy-MM-dd')
      data.birthdate = datePipe.transform(data.birthdate, 'yyyy-MM-dd')
      let selDept: any = []
      for(let d of data.department) selDept.push(d.id)
      data.department = selDept
      data.position_id = data.position_id.id
      data.status_id = data.status_id.id
      console.log(data)
      if(this.id != 0){ // edit employee
        data.id = this.id
        this.api.post(getEmployeesUrl, data).subscribe(res => {
          this.dialogRef.close('edit')
        })
        return
      }
      // else add employee
      this.api.put(getEmployeesUrl, data).subscribe(res => {
        this.dialogRef.close('add')
      })
    }else{
      alert('Please fill all forms and try agin')
    }
  }

}
