import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { CartService } from 'src/app/services/cart/cart.service';
import { UserService } from 'src/app/services/user/user.service';
import { Product } from 'src/app/models/products';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  products: Product[]=[];
  _search:string;
  searchProductItems:Product[]=[];
  numberOfItems:number=0;
  isLoggedIn=false;
  isAdmin=false;
  isAdminUrl= false;
  constructor(private cartService:CartService ,private userService:UserService,private router:Router) { 
    router.events.subscribe({
      next:(event)=>{
        if(event instanceof NavigationStart)
        { 
        let url=(<NavigationStart>event).url
         this.isAdminUrl= url.includes("admin")
        }
      }
    })
  }

  ngOnInit(): void {
    this.cartService.cartObservable.subscribe({
      next:(cart)=>{
        console.log(cart)
        this.numberOfItems=Object.keys(cart).length
      }
    })
    

    this.userService.loginObservable.subscribe({
      next:()=>{
        let token=this.userService.getToken();
        if(token!='')
        {
          this.checkAdmin()
          this.isLoggedIn=true;
        }else{
          this.isLoggedIn=false;
        }

      }
    })
  }

checkAdmin(){
  // check user is admin or not
  this.userService.isAdmin().subscribe(
    (isAdmin)=>{
      this.isAdmin=isAdmin
      
    }
  )
}
get search():string{
    
  return this._search;
  }

set search(value:string){
this._search=value;
this.searchProductItems=this.search?this.searchProduct(this.search):this.products;
console.log(this.searchProductItems);



}
searchProduct(searchby:string):Product[]{
  searchby=searchby.toLocaleLowerCase();
  return this.products.filter((value:Product)=>value.name.toLocaleLowerCase().includes(value.name));
  
}

logout()
{
  this.userService.logout()
  this.router.navigate(['login'])
}
}
