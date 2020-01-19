import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrintLeaveService } from 'src/app/shared/print-leave.service';

@Component({
  selector: 'app-leave-summary',
  templateUrl: './leave-summary.component.html',
  styleUrls: ['./leave-summary.component.css']
})
export class LeaveSummaryComponent implements OnInit {

  print_leave = JSON.parse(sessionStorage.getItem('print_leave'))

  constructor(private printer: PrintLeaveService) { }

  ngOnInit() {
    console.log("LeaveSummaryComponent", this.print_leave)
    this.printer.onDataReady()
  }

}
