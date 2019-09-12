import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';         

import { Product } from '../products/product.model';
import { ProductsService } from '../products/products.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {

  address = {
  	name: 'Abhijit Mishra',
  	pin: 751023,
  	house: 'Qr No=2/5, Xyz Vihar, Odisha'
  }	

  constructor(private productService: ProductsService, private alertController: AlertController, private toastController: ToastController) {}

  ngOnInit() {
  }

  products: Product[] = [
  new Product('p1', 'Product1', 'Good Product', 123, this.productService.productImages[0], 20, 10, 'regular' ),
  new Product('p2', 'Product3', 'Very Good Product', 23, this.productService.productImages[1], 120, 150, 'regular' ),
  new Product('p3', 'Product3', 'Not Good Product', 13, this.productService.productImages[2], 200, 70, 'occasional' )
  ]

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Item successfully removed from cart!',
      position: 'middle',
      duration: 2000
    });
    toast.present();
  }

  async removeAlert() {
    const alert = await this.alertController.create({
      header: 'Are you sure?',
      message: 'Remove this item from cart',
      buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary'
      }, {
        text: 'Remove',
        handler: () => {
          console.log('Removed');
          this.presentToast();
        }
      }
      ]
    });

    await alert.present();
  }

}
