import { Component, OnInit, ViewChildren } from '@angular/core';
import { IUser } from '../../model/user.interface';
import { UserServiceService } from '../../services/user-service.service';
import { UserItemComponent } from './user-item/user-item.component';
import { IOption } from '../../model/option.interface';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit{
  @ViewChildren("item") items: UserItemComponent[] = [];
  users: IUser[] = [];
  sortedValue = "firstname";
  searchText = "";
  selectedValue = "";
  disabled = true;

  options: IOption[] = [
    {value: 'firstname', viewValue: 'First Name'},
    {value: 'lastname', viewValue: 'Last Name'}
  ];

  constructor(private userService: UserServiceService){}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(data => {
      this.users = data;
    })
  }

  selectAll(){
    this.items = Array.from(this.items);
    if(this.items.every(it => it.checked)){
      this.items.forEach(it => it.checked = false)
    } else {
      this.items.forEach(it => it.checked = true)
    }
    this.onChanged();
  }

  deleteItem(){
    this.items.forEach((it, index) => {
      if(it.checked === true){
        this.users = this.users.filter(el => el.id != it.user?.id);
      }
    });
  }

  sortItems(){
    const value = this.selectedValue as keyof IUser;
    this.users.sort((a,b) => (a[value] > b[value]) ? 1 : ((b[value] > a[value]) ? -1 : 0))
  }

  onChanged(){
    this.items = Array.from(this.items);
    this.disabled = !this.items.some(it => it.checked);
  }

}
