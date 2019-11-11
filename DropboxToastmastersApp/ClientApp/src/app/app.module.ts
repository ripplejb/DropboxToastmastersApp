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
import { FileExplorerComponent } from './file-explorer/file-explorer.component';
import {FileExplorerService} from "./services/fileexplorer/file-explorer.service";

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    FileExplorerComponent
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
      },
      {
        path: '',
        component: FileExplorerComponent
      }
    ])
  ],
  providers: [CookieService, AccountService, DropBoxSignInGuard, FileExplorerService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
