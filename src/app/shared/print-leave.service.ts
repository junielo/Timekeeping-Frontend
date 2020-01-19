import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PrintLeaveService {

  isPrinting = false;

  constructor(private router: Router) { }

  printDocument() {
    this.isPrinting = true;
    this.router.navigate(['./print-leave'])
  }

  onDataReady() {
    setTimeout(() => {

      window.print();
      this.isPrinting = false;
      this.router.navigate(['./main/employee-list']);
    });
  }
}
