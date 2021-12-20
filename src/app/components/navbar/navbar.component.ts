import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Subscription } from 'rxjs';

import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  userStatusSub: Subscription;
  userLoggedIn: boolean = false;
  userForm!: FormGroup;

  constructor(
      private formBuilder: FormBuilder,
      public userService: UserService,
    ) { }

  ngOnInit(): void {
    this.userStatusSub = this.userService.getUserStatusListener()
      .subscribe( res => {
        this.userLoggedIn = res;
      });

    this.userForm = this.formBuilder.group({
      userName: '',
      password: ''
    });
  }

  onLogin() {
    this.userService.login(this.userForm.value.userName, this.userForm.value.password);
  }

  onLogout() {
    this.userService.logout();
  }

}
