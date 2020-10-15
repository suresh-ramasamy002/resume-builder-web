import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { switchMap, map } from 'rxjs/operators';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Customer, Source, Charge, SubscriptionPlan, StripeObject } from '../class/payment-models';
@Injectable()
export class PaymentService {

  // readonly api = `${environment.functionsURL}/app`;
  //
  // private stripe = Stripe(environment.stripeKey);
  // elements: any;
  // constructor(private http: HttpClient) {
  //   this.elements = this.stripe.elements();
  // }
  // createCharge(card: any, amount: number): Observable<Charge> {
  //   const url = `${this.api}/charges/`;
  //
  //   return fromPromise( this.stripe.createSource(card) ).pipe(
  //     switchMap(data => {
  //       return this.http.post<Charge>(url, { amount });
  //     })
  //   );
  // }
}
