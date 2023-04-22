import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { UserItemComponent } from './components/user-dashboard/user-item/user-item.component';
import { UserServiceService } from './services/user-service.service';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
  declarations: [
    UserDashboardComponent,
    UserItemComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatSelectModule,
    MatCheckboxModule,
    MatToolbarModule,
    FormsModule
  ],
  exports: [
    UserDashboardComponent
  ],
  providers: [
    UserServiceService
  ]
})
export class UsersModule { }
