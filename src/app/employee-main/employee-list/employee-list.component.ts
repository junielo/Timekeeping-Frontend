import { EmployeeDialogComponent } from './../employee-dialog/employee-dialog.component';
import { ApiService, getEmployees } from './../../shared/api.service';
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
    this.api.get(getEmployees).subscribe(res => {
      console.log(res)
      this.empList = res.employee
      this.dataSource.data = this.empList;
    })

  }

  // getDepts(depts){
  //   let str = ""
  //   for(let obj of depts; let x = index){
  //     str += obj.name
  //     if()
  //   }
  // }

  formDialog(action){
    const dialogRef = this.dialog.open(EmployeeDialogComponent, {
      width: '550px', height: '90%',
      data: ''
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        // this.orderPagination(this.paginator);
      }
    });
  }

}
