import { Injectable } from '@angular/core';
import {EnrollUserDetails} from '../class/api-model/request';
import {ResumeDownloadProperty, TemplateCoreObj} from '../class';
import {Feedback} from '../class/feedback';

@Injectable()
export class CoreDataService {
 private $userDetails: EnrollUserDetails = null;
 private $showSpinner: boolean = false;
 private $loadingMsg: string = null;
 private $feedbacks: Array<Feedback> = [];
 private $selectedTemplate: string = null;
 private $userDetailsArr: Array<EnrollUserDetails> = [];
 private $resumeDownloadedData: Array<ResumeDownloadProperty> = [];

  get resumeDownloadedData(): Array<ResumeDownloadProperty> {
    return this.$resumeDownloadedData;
  }

  set resumeDownloadedData(value: Array<ResumeDownloadProperty>) {
    this.$resumeDownloadedData = value;
  }

  get userDetailsArr(): Array<EnrollUserDetails> {
    return this.$userDetailsArr;
  }

  set userDetailsArr(value: Array<EnrollUserDetails>) {
    this.$userDetailsArr = value;
  }

  get selectedTemplate(): string {
    return this.$selectedTemplate;
  }

  set selectedTemplate(value: string) {
    this.$selectedTemplate = value;
  }

 get userDetails(): EnrollUserDetails {
    return this.$userDetails;
  }

  set userDetails(value: EnrollUserDetails) {
    this.$userDetails = value;
  }
  get feedbacks(): Array<Feedback> {
    return this.$feedbacks;
  }

  set feedbacks(value: Array<Feedback>) {
    this.$feedbacks = value;
  }
  get showSpinner(): boolean{
    return this.$showSpinner;
  }

  set showSpinner(value: boolean) {
    this.$showSpinner = value;
  }
  get loadingMsg(): string{
    return this.$loadingMsg;
  }

  set loadingMsg(value: string) {
    this.$loadingMsg = value;
  }
  // template variables;
  private $templateData: TemplateCoreObj = null;
  get templateData(): TemplateCoreObj{
    return this.$templateData;
  }

  set templateData(value: TemplateCoreObj) {
    this.$templateData = value;
  }
}
