import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

import { SegmentChangeEventDetail } from '@ionic/core';


import { Product } from './product.model';
import { ProductsService } from './products.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  loadedProducts: Product[];
  filteredProducts: Product[];
  price = 20;
  discount = 5;
  total = 15;
  constructor(private productService: ProductsService, private toastController: ToastController, private currency: CurrencyPipe) { }

  private filterProducts(filter: string) {
    return this.loadedProducts.filter( product => product.category === filter);
 }

  ngOnInit() {
    this.loadedProducts = this.productService.products;
    this.filteredProducts = this.filterProducts('regular');
  }

  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
    // console.log(event.detail);
    this.filteredProducts = this.filterProducts(event.detail.value);
  }

  async presentToastWithOptions() {
    const toast = await this.toastController.create({
      header: 'Item Added to Cart (6 Items)',
      message: `Cart Total: ${this.currency.transform(this.total, 'INR')}`,
      keyboardClose: true,
      cssClass: 'my-toast-class',
      buttons: [
        {
          side: 'start',
          icon: 'checkmark-circle',
          role: 'null'
        },
        {
          text: 'Place Order',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }


  onaddedToCart() {
    this.presentToastWithOptions();
  }

  onReturnQtyEntered(returnQty) {
    console.log(returnQty);
    // if(returnQty > purchaseQty) {
    //   console.log("Return Quantity cannot be greater than purchase quantity!");
    // }
  }

}
