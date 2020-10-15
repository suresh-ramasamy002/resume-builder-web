import {
  Component,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
  Input,
  Output,
  EventEmitter, OnInit, Inject
} from '@angular/core';
import  { NgForm } from '@angular/forms';
import {environment} from './../../../environments/environment';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {PaymentService} from '../../services/payment.service';
import {loadStripe, Stripe} from '@stripe/stripe-js';
import {AngularFireFunctions  } from '@angular/fire/functions';

@Component({
  selector: 'app-payment-request',
  templateUrl: './payment-request.component.html',
  styleUrls: ['./payment-request.component.scss']
})
export class PaymentRequestComponent implements OnInit, OnDestroy {
  totalAmount: number;
  private stripe: Stripe;
  @ViewChild('cardInfo', { static: false }) cardInfo: ElementRef;
  card: any;
  error: string;
  cardHandler = this.onChange.bind(this);
  constructor(public dialogRef: MatDialogRef<PaymentRequestComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private cd: ChangeDetectorRef, public pmt: PaymentService, private aff: AngularFireFunctions) {
  }
  async ngOnInit() {
    this.totalAmount = this.data.amount;
    this.stripe = await loadStripe(environment.stripeKey);
    const elements = this.stripe.elements();
    this.card = elements.create('card');
    this.card.mount(this.cardInfo.nativeElement);
    this.card.addEventListener('change', this.cardHandler);
    const button = document.getElementById('button');
    button.addEventListener('click', (event) => {
      event.preventDefault();
      const ownerInfo = {
        owner: {
          name: 'Suresh'
        },
        amount: this.totalAmount,
        currency: 'inr'
      };
      this.stripe.createSource(this.card, ownerInfo).then((result) => {
        console.log('result');
        if (result.error) {
          this.error = result.error.message;
        } else {
          this.error = null;
          this.stripeSourceHandler(result.source);
        }
        console.log(this.error);
      });
    });
  }
  ngOnDestroy() {
    this.card.removeEventListener('change', this.cardHandler);
    this.card.destroy();
  }
  onChange({ error }) {
    if (error) {
      this.error = error.message;
    } else {
      this.error = null;
    }
    this.cd.detectChanges();
  }
   private stripeSourceHandler(source): void {
      const callable = this.aff.httpsCallable('stripeChargeCall');
      const obs = callable(source);
      obs.subscribe(res => {
        console.log(res);
        if (res.result === 'SUCCESSFUL') {
           document.getElementsByClassName('text')[0].innerHTML = 'Payment Successful';
        } else {
          document.getElementsByClassName('text')[0].innerHTML = 'Something went wrong.';
        }
      });
   }
  // async onSubmit(form: NgForm) {
  //   const { token, error } = await this.stripe.createToken(this.card);
  //
  //   if (error) {
  //     console.log('Error:', error);
  //   } else {
  //     console.log('Success!', token);
  //   }
  // }
}
