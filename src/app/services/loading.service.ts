import { Injectable } from '@angular/core';

//cdk
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

//rxjs
import { Observable, Subject } from 'rxjs';
import { mapTo, scan, map, mergeMap } from 'rxjs/operators';
import {LoaderComponent} from '../components/loader/loader.component';
@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private spinnerTopRef = this.cdkSpinnerCreate();

  spin$: Subject<boolean> = new Subject();

  constructor(
    private overlay: Overlay,
  ) {

    this.spin$
      .asObservable()
      .pipe(
        map(val => val ? 1 : -1 ),
        scan((acc, one) => (acc + one) >= 0 ? acc + one : 0, 0)
      )
      .subscribe(
        (res) => {
          if(res === 1){ this.showSpinner(); }
          else if( res == 0 ){
            this.spinnerTopRef.hasAttached() ? this.stopSpinner() : null;
          }
        }
      );
  }

  private cdkSpinnerCreate() {
    return this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'dark-backdrop',
      positionStrategy: this.overlay.position()
        .global()
        .centerHorizontally()
        .centerVertically()
    });
  }

 showSpinner(){
    this.spinnerTopRef.attach(new ComponentPortal(LoaderComponent));
  }

 stopSpinner() {
    this.spinnerTopRef.detach();
  }
}
