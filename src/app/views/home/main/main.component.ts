import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {CartService} from "../../../shared/services/cart.service";
import {from, map, Observable, Subject, Subscription} from "rxjs";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PopupComponent} from "../../../shared/components/popup/popup.component";
import {environment} from "../../../../environments/environment";


@Component({
  selector: 'app-root',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy, AfterViewInit{

  // private observable: Observable<number>;
  private subject: Subject<number>

  private subscription: Subscription | null = null;



  constructor( public cartService: CartService, private  modalService: NgbModal) {

    this.subject = new Subject<number>();
    let count  = 0;
        const interval = setInterval(() => {
          this.subject.next(count++)
        }, 1000)
        const timeout1 = setTimeout(() => {
          this.subject.complete()
        }, 4000);
    // this.observable = from([1,2,3,4,5])


  // this.observable = new Observable((observer) => {
  //   let count  = 0;
  //     const interval = setInterval(() => {
  //       this.subject.next(count++)
  //     }, 1000)
  //     const timeout1 = setTimeout(() => {
  //       this.subject.complete()
  //     }, 4000);
  //
  //   return {
  //     unsubscribe() {
  //       clearInterval(interval);
  //       clearTimeout(timeout1);
  //     }
  //   }
  //   })
  }

  ngOnInit() {


    console.log(environment.production)
    // const myModalAlternative = new bootstrap.Modal('#myModal', {});
    // myModalAlternative.show();

    this.subscription = this.subject
      .pipe(
        map((number: number) => {
          return number * 10;
        })
      )
      .subscribe(
    {
      next:(param: number) => {
        console.log('subscriber 1: ' + param);
        },
      error: (error: string) => {
        console.log('Error ' + error)
     }
   })
 }


 @ViewChild(PopupComponent)
 private popupComponent!: PopupComponent;

 ngAfterViewInit() {
   this.popupComponent.open();

 }


  ngOnDestroy() {
    this.subscription?.unsubscribe();
 }

  test() {
    this.subject
      .pipe(
        map(number => {
          return 'Number: ' + number
        })
      )

      .subscribe((param: string) => {
      console.log('subscribes 2: ' + param);
    })
  }
}
