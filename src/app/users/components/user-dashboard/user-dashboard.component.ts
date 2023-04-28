import { Component, OnInit, ViewChildren, OnDestroy } from '@angular/core';
import { IUser } from '../../model/user.interface';
import { UserServiceService } from '../../services/user-service.service';
import { UserItemComponent } from './user-item/user-item.component';
import { IOption } from '../../model/option.interface';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { UserPopUpComponent } from './user-pop-up/user-pop-up.component'

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit, OnDestroy{
  @ViewChildren("item") items: UserItemComponent[] = [];
  users: IUser[] = [];
  sortedValue = "firstname";
  searchText = "";
  selectedValue = "";
  disabled = true;
  subsciption: Subscription | undefined

  options: IOption[] = [
    {value: 'firstName', viewValue: 'First Name'},
    {value: 'lastName', viewValue: 'Last Name'}
  ];

  address = ["Mrs.", "Ms.", "Mr.", "Miss."];

  constructor(private userService: UserServiceService, public dialog: MatDialog){}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(){
    this.subsciption = this.userService.getAllUsers().subscribe(data => {
      for(let i = 0; i < data.length; i++){
        this.users[i] = data[i];
        let names = data[i].name.split(" ");

        if(this.address.includes(names[0])){
          this.users[i].firstName = names[names.length - 2];
        } else this.users[i].firstName = names[0];
        this.users[i].lastName = names[names.length - 1];

      }
      console.log(this.users)
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
        this.userService.deleteUser(index).subscribe();
        this.users = this.users.filter(el => el.id != it.user?.id);
      }
    });
    this.disabled = true;
  }

  sortItems(){
    const value = this.selectedValue as keyof IUser;
    this.users.sort((a,b) => (a[value] > b[value]) ? 1 : ((b[value] > a[value]) ? -1 : 0))
  }

  onChanged(){
    this.items = Array.from(this.items);
    this.disabled = !this.items.some(it => it.checked);
  }

  addUser(){
    const matDialogRef = this.dialog.open(UserPopUpComponent);
    matDialogRef.afterClosed().subscribe(data => {
      console.log(data)
      if(data) this.users.push(data);
    }); 
  }

  ngOnDestroy(): void {
    this.subsciption?.unsubscribe();
  }
}
