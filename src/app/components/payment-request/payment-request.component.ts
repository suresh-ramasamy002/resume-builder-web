import {Component, OnInit, Input, AfterViewInit, ViewChild} from '@angular/core';
import {PaymentService} from '../../services/payment.service';
import {environment} from './../../../environments/environment';
@Component({
  selector: 'app-payment-request',
  templateUrl: './payment-request.component.html',
  styleUrls: ['./payment-request.component.scss']
})
export class PaymentRequestComponent implements OnInit, AfterViewInit {
   private STRIPE_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; // TODO: PUT YOUR STRIPE PUBLISHABLE KEY HERE
  private FIREBASE_FUNCTION = 'https://[YOUR_FIREBASE_PROJECT].cloudfunctions.net/charge/'; // TODO: PUT YOUR FIREBASE FUNCTIONS URL HERE

  private stripe = Stripe(environment.stripeKey);
  private elements = this.stripe.elements();

  private charge_amount = 15000;
  private charge_currency = 'inr';

  // Store the elements used
  private elForm = document.getElementById('form');
  private elCheckout = document.getElementById('checkout');
  private elPaymentButton = document.getElementById('payment-request-button');
  private elCard = document.getElementById('card-element');
  private elError = document.getElementById('error');
  private elProcessing = document.getElementById('processing');
  private elThanks = document.getElementById('thanks');

ngOnInit() {

}
ngAfterViewInit() {
  // this.addPaymentRequestMethod();
  this.addCardMethod();
  this.addCheckoutMethod();
}

addPaymentRequestMethod() {
    const paymentRequest = this.stripe.paymentRequest({
      country: 'IN',
      currency: this.charge_currency,
      total: {
        label: 'Total',
        amount: this.charge_amount,
      }
    });

    const paymentRequestButton = this.elements.create('paymentRequestButton', {
      paymentRequest,
      style: {
        paymentRequestButton: {
          type: 'default'
        }
      }
    });

    // Only mount button if browser supports payment requests
    (async () => {
      const result = await paymentRequest.canMakePayment();
      if (result) paymentRequestButton.mount(this.elPaymentButton);
      else this.elPaymentButton.style.display = 'none';
    })();

    paymentRequest.on('token', async result => {

      // Pass the received token to our Firebase function
      let res = await this.charge(result.token, this.charge_amount, this.charge_currency);
      if (res.body.error) {
        result.complete('fail');
      } else {

        // Card successfully charged
        result.complete('success');
        this.elForm.style.display = 'none';
        this.elThanks.style.display = 'block';
      }
    });
  }

  addCardMethod() {
    const card = this.elements.create('card');
    card.mount(this.elCard);

    // Create flags to help prevent duplicate submissions
    let isSubmitting, isSuccess;

    // Handle validation errors from the card element
    card.addEventListener('change', e => {
      if (e.error) {
        this.elError.textContent = e.error.message;
      } else {
        this.elError.textContent = '';
      }
    });

    this.elForm.addEventListener('submit', async e => {
      e.preventDefault();
      if (isSubmitting) return;
      isSubmitting = true;

      this.elForm.style.display = 'none';
      this.elProcessing.style.display = 'block';

      let result = await this.stripe.createToken(card);

      // Error in receiving token
      if (result.error) return this.elError.textContent = result.error.message;

      // Pass the received token to our Firebase function
      let res = await this.charge(result.token, this.charge_amount, this.charge_currency);
      if (res.body.error) return this.elError.textContent = res.body.error;

      // Card successfully charged
      card.clear();
      isSuccess = true;

      isSubmitting = false;
      this.elProcessing.style.display = 'none';

      // Either display thanks or re-display form if there was an error
      if (isSuccess) {
        this.elThanks.style.display = 'block';
      } else {
        this.elForm.style.display = 'block';
      }
    });
  }

  addCheckoutMethod() {
    const handler = StripeCheckout.configure({
      key: this.STRIPE_PUBLIC_KEY,
      locale: 'auto',
      token: async token => {

        // Pass the received token to our Firebase function
        let res = await this.charge(token, this.charge_amount, this.charge_currency);
        if (res.body.error) return this.elError.textContent = res.body.error;

        // Card successfully charged
        this.elForm.style.display = 'none';
        this.elThanks.style.display = 'block';
      }
    });

    this.elCheckout.addEventListener('click', e => {
      e.preventDefault();
      handler.open({
        name: 'Resume Payment',
        amount: this.charge_amount,
        currency: this.charge_currency,
      });
    });

    // Close Checkout on page navigation
    window.addEventListener('popstate', () => handler.close());
  }

  // Function used by all three methods to send the charge data to your Firebase function
  async charge(token, amount, currency) {
    const res = await fetch(this.FIREBASE_FUNCTION, {
      method: 'POST',
      body: JSON.stringify({
        token,
        charge: {
          amount,
          currency,
        },
      }),
    });
    const data = await res.json();
    data.body = JSON.parse(data.body);
    return data;
  }
}
