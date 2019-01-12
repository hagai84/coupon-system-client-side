import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit { 

  constructor(public cartService:CartService, public utilService:UtilService) { }

  ngOnInit() {
  }

}
