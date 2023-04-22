import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser } from 'src/app/users/model/user.interface';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss']
})
export class UserItemComponent {
  @Input() user: IUser | undefined;
  @Output() onChanged = new EventEmitter<boolean>(); 
  checked = false;
    
  change() {
      this.onChanged.emit();
  }
}
