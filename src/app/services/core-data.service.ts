import { Injectable } from '@angular/core';
import {EnrollUserDetails} from '../class/api-model/request';

@Injectable({
  providedIn: 'root'
})
export class CoreDataService {
 private $userDetails: EnrollUserDetails = null;
 private $showSpinner: boolean = false;
 private $loadingMsg: string = null;
 get userDetails(): EnrollUserDetails {
    return this.$userDetails;
  }

  set userDetails(value: EnrollUserDetails) {
    this.$userDetails = value;
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
}
