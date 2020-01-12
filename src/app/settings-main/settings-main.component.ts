import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-settings-main',
  templateUrl: './settings-main.component.html',
  styleUrls: ['./settings-main.component.css']
})
export class SettingsMainComponent implements OnInit {

  formGroup: FormGroup

  btnId: number = 1
  toolbarTitle = 'Account List'
  searchTitle = 'Search Account'
  public destroyed = new Subject<any>();

  constructor(private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      search: ['']
    })
    
    let url = this.router.url
    if(url.includes('employee-account')) {
      this.btnId = 1
      this.toolbarTitle = 'Account List'
      this.searchTitle = 'Search Account'
    }
    else if(url.includes('department')) {
      this.btnId = 2
      this.toolbarTitle = 'Department List'
      this.searchTitle = 'Search Department'
    }
    else if(url.includes('position')) {
      this.btnId = 3
      this.toolbarTitle = 'Position List'
      this.searchTitle = 'Search Position'
    }
    else if(url.includes('employee-status')) {
      this.btnId = 4
      this.toolbarTitle = 'Status List'
      this.searchTitle = 'Search Status'
    }
    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd),
      takeUntil(this.destroyed)
    ).subscribe((res) => {
      let tmp: any = res;
      if(tmp.urlAfterRedirects.includes('employee-account')) {
        this.btnId = 1
        this.toolbarTitle = 'Account List'
        this.searchTitle = 'Search Account'
      }
      else if(tmp.urlAfterRedirects.includes('department')) {
        this.btnId = 2
        this.toolbarTitle = 'Department List'
        this.searchTitle = 'Search Department'
      }
      else if(tmp.urlAfterRedirects.includes('position')) {
        this.btnId = 3
        this.toolbarTitle = 'Position List'
        this.searchTitle = 'Search Position'
      }
      else if(tmp.urlAfterRedirects.includes('employee-status')) {
        this.btnId = 4
        this.toolbarTitle = 'Status List'
        this.searchTitle = 'Search Status'
      }
    });
  }

}
