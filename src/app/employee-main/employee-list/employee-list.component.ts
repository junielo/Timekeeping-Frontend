import { EmployeeLeaveComponent } from './../employee-leave/employee-leave.component';
import { EmployeeDialogComponent } from './../employee-dialog/employee-dialog.component';
import { ApiService, getEmployeesUrl, deleteEmplyeeUrl } from './../../shared/api.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  
  dataSource: MatTableDataSource<any>;
  displayedColumns = ['name', 'position', 'department', 'status', 'hired'];
  empList: any[] = []

  DIALOG_ADD = 1
  DIALOG_EDIT = 2

  constructor(private api: ApiService, public dialog: MatDialog) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.empList);
    this.getData()
  }

  getData(){
    this.api.get(getEmployeesUrl).subscribe(res => {
      console.log(res)
      this.empList = res.employee
      this.dataSource.data = this.empList
    })
  }

  formDialog(id){

    const dialogRef = this.dialog.open(EmployeeDialogComponent, {
      width: '550px', height: '90%',
      data: id
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res === 'add') {
        alert('Employee successfully added!')
        this.getData()
      }else if(res === 'edit'){
        alert('Employee successfully updated!')
        this.getData()
      }
    })
  }

  setLeave(id){
    this.dialog.open(EmployeeLeaveComponent, {
      width: '800px', height: '90%',
      data: id
    });
  }

  delete(id){
    if(!confirm('Do you really want to delete this employee?')) return
    this.api.delete(deleteEmplyeeUrl, {id: id}).subscribe(res => {
      if(res.success){
        alert('Employee successfully deleted!')
        this.getData()
      }
    })
  }

}
