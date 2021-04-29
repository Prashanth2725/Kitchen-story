import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/products';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnInit {
  quantity:number=0
  @Input('product')
  product:Product
  constructor(private cartService:CartService) { }

  ngOnInit(): void {
    this.cartService.cartObservable.subscribe({
      next:(cart)=>{
        this.quantity=this.cartService.getQuantity(this.product)
      }
    })
  }
  minusQuantity()
  {
    this.quantity--;
    this.cartService.setQuantity(this.product,this.quantity)
  }
  plusQuantity()
  {
    this.quantity++;
    this.cartService.setQuantity(this.product,this.quantity)
  }

}
