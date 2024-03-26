import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from "../../shared/services/product.service";
import {CartService} from "../../shared/services/cart.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {


  private subscription: Subscription | null = null;
  private subscriptionOrder: Subscription | null = null;
  constructor( public cartService: CartService, private activatedRoute: ActivatedRoute, private productService: ProductService) { }

  ngOnInit() {
    // if(this.cartService.product-card) {
    //   this.formValues.productTitle = this.cartService.product-card;
    // }


    this.subscription = this.activatedRoute.queryParams.subscribe((params) => {
      if(params) {
        console.log(params['product'])
        this.formValues.productTitle = params['product'];
      }
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
    this.subscriptionOrder?.unsubscribe();
  }

  test() {
    this.subscription?.unsubscribe();
  }

  public formValues = {
    productTitle: '',
    address: '',
    phone: '',
  }



  public createOrder() {
    if(!this.formValues.productTitle) {
      alert('Write Pizza');
      return;
    }
    if(!this.formValues.address) {
      alert('Write Address');
      return;
    }
    if(!this.formValues.phone) {
      alert('Write Phone');
      return;
    }


    this.subscriptionOrder = this.productService.createOrder({
      product: this.formValues.productTitle,
      address: this.formValues.address,
      phone: this.formValues.phone,
    })
      .subscribe(response => {
        if(response.success && !response.message) {
          alert('Thank you for order');

          this.formValues = {
            productTitle: '',
            address: '',
            phone: '',
          }
        } else {
          alert('Error');
        }
      })


  }



}
