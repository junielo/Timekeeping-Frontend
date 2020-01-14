import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmployeeListComponent } from './employee-main/employee-list/employee-list.component';
import { MainDrawerComponent } from './main-drawer/main-drawer.component';
import { MaterialsModule } from './shared/materials.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeDialogComponent } from './employee-main/employee-dialog/employee-dialog.component';
import { EmployeeLeaveComponent } from './employee-main/employee-leave/employee-leave.component';
import { LeaveSummaryComponent } from './print-forms/leave-summary/leave-summary.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SettingsMainComponent } from './settings-main/settings-main.component';
import { EmployeeAccountComponent } from './settings-main/employee-account/employee-account.component';
import { DepartmentComponent } from './settings-main/department/department.component';
import { PositionComponent } from './settings-main/position/position.component';
import { EmployeeStatusComponent } from './settings-main/employee-status/employee-status.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    MainDrawerComponent,
    EmployeeDialogComponent,
    EmployeeLeaveComponent,
    LeaveSummaryComponent,
    LoginPageComponent,
    SettingsMainComponent,
    EmployeeAccountComponent,
    DepartmentComponent,
    PositionComponent,
    EmployeeStatusComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    EmployeeDialogComponent,
    EmployeeLeaveComponent
  ]
})
export class AppModule { }
