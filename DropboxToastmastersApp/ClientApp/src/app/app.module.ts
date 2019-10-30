import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

import {AppComponent} from './app.component';
import {NavMenuComponent} from './nav-menu/nav-menu.component';
import {AccountService} from "./services/account/account.service";
import {DropBoxSignInGuard} from "./guards/dropboxsignin/drop-box-sign-in.guard";

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: 'dropboxSignIn',
        canActivate: [DropBoxSignInGuard],
        component: DropBoxSignInGuard
      }
    ])
  ],
  providers: [CookieService, AccountService, DropBoxSignInGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
