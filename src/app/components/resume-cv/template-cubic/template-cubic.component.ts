import {Component, Input, OnInit} from '@angular/core';
import {CoreDataService} from '../../../services/core-data.service';
import html2pdf from 'html2pdf.js';
import {PdfViewerComponent} from '../../pdf-viewer/pdf-viewer.component';
import {UserService} from '../../../services/user.service';
import {MatDialog} from '@angular/material/dialog';
import {ConstantDataService} from '../../../services/constant-data.service';
@Component({
  selector: 'app-template-cubic',
  templateUrl: './template-cubic.component.html',
  styleUrls: ['./template-cubic.component.scss']
})
export class TemplateCubicComponent implements OnInit {
  constructor(public coreDataService: CoreDataService, public dialog: MatDialog, public constantDataService: ConstantDataService) { }

  ngOnInit(): void {
  }
  breakLine(label){
    return label.replace(/(?:\r\n|\r|\n)/g, '<br>');
  }
  setColor(colorVal) {
    let color = '#ffffff';
    switch(colorVal) {
      case '#d7d7d7' : color = '#363d49';
        break;
      case '#bbbcbf' : color = '#363d49';
        break;
      case '#8c9096' : color = '#363d49';
        break;
    }
    return color;
  }
  setFontSize(starType) {
   let size = '1em';
   switch (starType) {
     case 'round': size = '1.4em'; break;
     case 'square': size = '1.7em'; break;
     case 'star':  size = '1em'; break;
     case 'diamond': size = '1em'; break;
   }
   return size;
  }
}
