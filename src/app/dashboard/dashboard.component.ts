import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService, addLeavesUrl, setleaveUrl } from '../shared/api.service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  currentUser = JSON.parse(sessionStorage.getItem('user'))
  
  leaveList: any[] = []

  constructor(private api: ApiService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getData()
  }

  getData(){
    this.api.post(addLeavesUrl, {stat: 'pending'}).subscribe(res => {
      this.leaveList = res.response
      for(let row of this.leaveList){
        row.selected = false
      }
      console.log(this.leaveList)
    })
  }

  checkLeaveSel(){
    let sel = false
    for(let row of this.leaveList){
       if(row.selected) sel = true
    }
    return sel
  }

  leaveMultiple(mAction: string){
    if(!confirm('Do you want to save all the selected leave request?')) return
    let leaveIDs = []
    for(let row of this.leaveList){
      leaveIDs.push(row.id)
    }
    this.api.post(setleaveUrl, {action: mAction, leaveIDs: leaveIDs, id: this.currentUser.id}).subscribe(res => {
      console.log(res)
      this.getData()
    })
  }

  leaveSingle(mAction: string, mID: number){
    if(!confirm('Do you want to save this leave request?')) return
    let leaveIDs = []
    leaveIDs.push(mID)
    this.api.post(setleaveUrl, {action: mAction, leaveIDs: leaveIDs, id: this.currentUser.id}).subscribe(res => {
      console.log(res)
      this.getData()
    })
  }

}
