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
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {environment} from './../../../environments/environment';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {PaymentService} from '../../services/payment.service';
import {loadStripe, Stripe} from '@stripe/stripe-js';
import {AngularFireFunctions  } from '@angular/fire/functions';
import {CoreDataService} from '../../services/core-data.service';

@Component({
  selector: 'app-payment-request',
  templateUrl: './payment-request.component.html',
  styleUrls: ['./payment-request.component.scss']
})
export class PaymentRequestComponent implements OnInit, OnDestroy {
  totalAmount: number;
  public customerName = null;
  public phoneNo = null;
  public paymentMsg = null;
  private stripe;
  // @ViewChild('cardInfo', { static: false }) cardInfo: ElementRef;
  card: any;
  error: string;
  public isProcessing = false;
  public showFormError = false;
  cardHandler = this.onChange.bind(this);
  constructor(public dialogRef: MatDialogRef<PaymentRequestComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private cd: ChangeDetectorRef, public pmt: PaymentService, private aff: AngularFireFunctions, private formBuilder: FormBuilder, private coreDataService: CoreDataService) {
  }
  async ngOnInit() {
    this.totalAmount = this.data.amount;
    this.stripe = await loadStripe(environment.stripeKey);
    var elements = this.stripe.elements({
      fonts: [
        {
          cssSrc: 'https://fonts.googleapis.com/css?family=Roboto',
        },
      ],
    });
    this.card =  elements.create('card', {
      hidePostalCode: true,
      style: {
        base: {
          iconColor: '#666EE8',
          color: '#31325F',
          lineHeight: '40px',
          fontWeight: 300,
          fontFamily: 'Helvetica Neue',
          fontSize: '15px',
          '::placeholder': {
            color: '#dedddd',
          },
        },
      }
    });
    // this.card = elements.create('card', {
    //
    // });
    this.card.mount('#card-element');
    // this.card.mount(this.cardInfo.nativeElement);
    this.card.addEventListener('change', this.cardHandler);
    const button = document.getElementById('button');
    button.addEventListener('click', (event) => {
      event.preventDefault();
      this.paymentMsg = null;
      if (this.customerName != null && this.customerName != '' && this.phoneNo != null && this.phoneNo != '') {
        this.showFormError = false;
        const ownerInfo = {
          owner: {
            name: this.customerName,
            phone: this.phoneNo
          },
          amount: this.totalAmount,
          currency: 'inr'
        };
        this.stripe.createSource(this.card, ownerInfo).then((result) => {
          this.isProcessing = true;
          if (result.error) {
            this.error = result.error.message;
            this.isProcessing = false;
          } else {
            this.error = null;
            this.stripeSourceHandler(result.source);
          }
        });
      } else {
        this.showFormError = true;
      }
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
      this.paymentMsg = null;
      obs.subscribe(res => {
        if (res.result === 'Payment Successful') {
           this.paymentMsg = 'Success';
           this.isProcessing = false;
           setTimeout(() => {
             this.dialogRef.close(true);
             this.coreDataService.showSpinner = true;
           }, 2000);
        } else {
          this.paymentMsg = 'Failure';
          this.isProcessing = false;
        }
      });
   }
  allowNumbers(e) {
    return ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105) || e.keyCode === 8 || e.keyCode === 9 || e.keyCode === 13 || e.keyCode === 37 || e.keyCode === 39 || ((e.keyCode == 65 || e.keyCode == 86  || e.keyCode == 88 || e.keyCode == 67) && (e.ctrlKey === true || e.metaKey === true)));
  }
}
