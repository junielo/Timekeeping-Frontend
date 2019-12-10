import { MainDrawerComponent } from './main-drawer/main-drawer.component';
import { EmployeeListComponent } from './employee-main/employee-list/employee-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '', component: MainDrawerComponent,
    children: [
      { path: '', redirectTo: 'employee-list', pathMatch: 'full' },
      { path: 'employee-list', component: EmployeeListComponent }
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
