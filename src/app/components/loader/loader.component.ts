import { Component, OnInit } from '@angular/core';
import {CoreDataService} from '../../services/core-data.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  constructor(public coreDataService: CoreDataService) { }

  ngOnInit(): void {
  }

}
