import {Component, Inject, OnInit} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {AccountService, UserAccount} from "../services/account/account.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit{
  isExpanded = false;

  userAccount: UserAccount;


  constructor(private accountService: AccountService, private router: Router) {

  }

  ngOnInit(): void {
    const accountResponseSubscription$ = this.accountService.getAccountResponse().subscribe(
      ua => {
        this.userAccount = ua.body;
        accountResponseSubscription$.unsubscribe();
      },
      err =>  {
        this.userAccount = null;
        accountResponseSubscription$.unsubscribe();
      }
    );
  }

  signIn() {
    const signInResponseSubscription$ = this.accountService.signIn().subscribe(
      response =>  {
        if (response.body.indexOf("dropbox.com") > 0) {
          this.router.navigate(['/dropboxSignIn', {externalUrl: response.body }]);
        }
        signInResponseSubscription$.unsubscribe();
      },
      error => {
        alert('Error Signing In');
        signInResponseSubscription$.unsubscribe();
      }
    );

  }

  isSignedIn(): boolean {
    return this.userAccount != null;
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }


}
