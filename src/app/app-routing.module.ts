import { EmployeeStatusComponent } from './settings-main/employee-status/employee-status.component';
import { PositionComponent } from './settings-main/position/position.component';
import { DepartmentComponent } from './settings-main/department/department.component';
import { EmployeeAccountComponent } from './settings-main/employee-account/employee-account.component';
import { SettingsMainComponent } from './settings-main/settings-main.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { LeaveSummaryComponent } from './print-forms/leave-summary/leave-summary.component';
import { MainDrawerComponent } from './main-drawer/main-drawer.component';
import { EmployeeListComponent } from './employee-main/employee-list/employee-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'main', component: MainDrawerComponent,
    children: [
      { path: '', redirectTo: 'employee-list', pathMatch: 'full' },
      { path: 'employee-list', component: EmployeeListComponent },
      { path: 'settings', component: SettingsMainComponent,
        children: [
          { path: '', redirectTo: 'employee-account', pathMatch: 'full' },
          { path: 'employee-account', component: EmployeeAccountComponent },
          { path: 'department', component: DepartmentComponent },
          { path: 'position', component: PositionComponent },
          { path: 'employee-status', component: EmployeeStatusComponent }
        ] }
    ] 
  },
  { path: 'print-leave', component: LeaveSummaryComponent },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
