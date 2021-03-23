import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { switchMap, map } from 'rxjs/operators';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Customer, Source, Charge, SubscriptionPlan, StripeObject } from '../class/payment-models';
@Injectable()
export class PaymentService {
  private rzpSecretTestKey = 'eWtiXwHAOL6OkKStsJchT5Ns';
  private rzpPublicTestKey = 'rzp_test_zmGRanXtTp3AhM';
}
