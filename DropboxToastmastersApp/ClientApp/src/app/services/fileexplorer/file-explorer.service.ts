import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {Observable} from "rxjs";
import {DropBoxFile} from "../../models/drop-box.file";

@Injectable({
  providedIn: 'root'
})
export class FileExplorerService {

  SessionKey = 'Session';
  filesGetUrl = 'api/files/';

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  getFiles(path: string): Observable<HttpResponse<Array<DropBoxFile>>> {
    if (this.cookieService.check(this.SessionKey)) {
      return this.http.get<Array<DropBoxFile>>(
        this.filesGetUrl + this.cookieService.get(this.SessionKey),
        {observe: "response"}
        );
    }

    throw 'Not Signed In.'
  }

}
