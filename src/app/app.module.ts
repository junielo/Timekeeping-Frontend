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

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    MainDrawerComponent,
    EmployeeDialogComponent
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
    EmployeeDialogComponent
  ]
})
export class AppModule { }
