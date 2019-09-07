import { Component, OnInit } from '@angular/core';
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
  constructor(private productService: ProductsService, private toastController: ToastController) { }

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
      header: 'Toast header',
      message: 'Click to Close',
      buttons: [
        {
          side: 'start',
          icon: 'star',
          text: 'Favorite',
          handler: () => {
            console.log('Favorite clicked');
          }
        }, {
          text: 'Go TO Cart',
          role: 'cancel',
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

}
