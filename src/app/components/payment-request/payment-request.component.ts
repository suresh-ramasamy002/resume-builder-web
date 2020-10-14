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
import {environment} from './../../../environments/environment';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {PaymentService} from '../../services/payment.service';
import { Charge, Source} from '../../class';

@Component({
  selector: 'app-payment-request',
  templateUrl: './payment-request.component.html',
  styleUrls: ['./payment-request.component.scss']
})
export class PaymentRequestComponent implements OnInit, AfterViewInit {

  // Total amount of the charge
  @Input() totalAmount: number;

  // Emit result of operation to other components
  @Output() stripeResult = new EventEmitter<Charge | Source>();

  // Result used locacally to display status.
  result: Charge | Source;

  // The Stripe Elements Card
  @ViewChild('cardElement') cardElement: ElementRef;
  card: any;
  formError: string;
  formComplete = false;

  // State of async activity
  loading = false;
  constructor(public dialogRef: MatDialogRef<PaymentRequestComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private cd: ChangeDetectorRef, public pmt: PaymentService) {
  }
  ngOnInit() {
    this.totalAmount = this.data.amount;
  }

  ngAfterViewInit() {
    this.card = this.pmt.elements.create('card');
    this.card.mount(this.cardElement.nativeElement);

    // Listens to change event on the card for validation errors
    this.card.on('change', (evt) => {
      this.formError = evt.error ? evt.error.message : null;
      this.formComplete = evt.complete;
      this.cd.detectChanges();
    });
  }

  // Called when the user submits the form
  formHandler(): void {
    this.loading = true;
    let action;
    if (this.totalAmount) {
      action = this.pmt.createCharge(this.card, this.totalAmount);
    }
    action.subscribe(
      data => {
        this.result = data;
        this.stripeResult.emit(data);
        this.loading = false;
      },
      err => {
        this.result = err;
        this.loading = false;
      }
    );
  }


  ngOnDestroy() {
    this.card.destroy();
  }
}
