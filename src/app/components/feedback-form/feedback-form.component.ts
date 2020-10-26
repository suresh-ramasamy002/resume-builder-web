import {Component, Inject, OnInit} from '@angular/core';
import {Feedback} from '../../class/feedback';
import {UserService} from '../../services/user.service';
import {CoreDataService} from '../../services/core-data.service';
import * as firebase from 'firebase';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.scss']
})
export class FeedbackFormComponent implements OnInit {
   public stars = 0;
   public feedback = null;
   private aId = 'V5cCGAXOpHMTvgL2b2rccgDLt3x1';
   private feedbacks: Array<Feedback> = [];
  constructor(private userService: UserService, private coreDataService: CoreDataService, public dialogRef: MatDialogRef<FeedbackFormComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.userService.getFeedbacks(this.aId);
    setTimeout(() => {
    this.feedbacks = this.coreDataService.feedbacks;
    }, 2000);
  }
  submitFeedBack() {
    this.feedbacks.push({stars: this.stars, feedback: this.feedback, selectedTemplate: this.data.selectedTemplate, price: this.data.price});
    this.coreDataService.feedbacks = this.feedbacks;
    this.userService.setFeedBack(this.aId);
    this.dialogRef.close(true);
  }
  setStars(no) {
    this.stars = no;
  }
}
