import { Component, OnInit } from '@angular/core';
import {FileExplorerService} from "../services/fileexplorer/file-explorer.service";
import {DropBoxFile} from "../models/drop-box.file";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-file-explorer',
  templateUrl: './file-explorer.component.html',
  styleUrls: ['./file-explorer.component.css']
})
export class FileExplorerComponent implements OnInit {

  files: Array<DropBoxFile>;
  getFiles$: Subscription;

  constructor(private fileExplorerService: FileExplorerService) { }

  ngOnInit() {
    this.getFiles$ = this.fileExplorerService.getFiles('').subscribe(arr => {
      this.files = arr.body;
        this.getFiles$.unsubscribe();
    },
      error => {});
  }

}
