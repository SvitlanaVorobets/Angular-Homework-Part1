import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms'
import { MatDialogRef } from '@angular/material/dialog';
import { IUser } from 'src/app/users/model/user.interface';
import { UserServiceService } from 'src/app/users/services/user-service.service';

@Component({
  selector: 'app-user-pop-up',
  templateUrl: './user-pop-up.component.html',
  styleUrls: ['./user-pop-up.component.scss']
})
export class UserPopUpComponent implements OnInit{
  userForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private userService: UserServiceService,
    public dialogRef: MatDialogRef<UserPopUpComponent>) {
  }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(60)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      name: ['']
    })
  }

  get firstName() {
    return this.userForm.get('firstName');
  }

  get lastName() {
    return this.userForm.get('lastName');
  }

  get email() {
    return this.userForm.get('email');
  }

  get phone() {
    return this.userForm.get('phone');
  }

  get name() {
    return this.userForm.get('name');
  }

  onSubmit(){
    this.name?.setValue(this.userForm.get('firstName')!.value + " " + this.userForm.get('lastName')!.value);
    this.userService.addUser(this.userForm.value).subscribe(data => {
      this.dialogRef.close(data);
    });
  }

  onCancel(){
    console.log("click")
    this.dialogRef.close(false);
  }
}
