import { Component, OnInit } from '@angular/core';
import {CoreDataService} from '../../services/core-data.service';

@Component({
  selector: 'app-template-root',
  templateUrl: './template-root.component.html',
  styleUrls: ['./template-root.component.scss']
})
export class TemplateRootComponent implements OnInit {
  constructor(private coreDataService: CoreDataService) { }

  ngOnInit(): void {
  }

}
