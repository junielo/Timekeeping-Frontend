import { ApiService, getEmployees } from './../../shared/api.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  
  dataSource: MatTableDataSource<any>;
  displayedColumns = ['name', 'position', 'status', 'hired'];
  empList: any[] = []

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.empList);
    this.api.get(getEmployees).subscribe(res => {
      console.log(res)
      this.empList = res.employee
      this.dataSource.data = this.empList;
    })

  }

}
