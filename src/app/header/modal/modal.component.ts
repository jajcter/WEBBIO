import { Component, OnInit } from '@angular/core';
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

import { SocialAuthService, SocialUser } from "angularx-social-login";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  //
  user2: SocialUser;
  loggedIn: boolean;
  faShoppingCart=faShoppingCart;
  constructor(
    private authService: SocialAuthService
  ) { }

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user2 = user;
      console.log(this.user2)//borrar
      this.loggedIn = (user != null);
    })
  }

  signOut(): void {
    this.authService.signOut();
  }

}
